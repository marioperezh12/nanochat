(function () {

  // ============================================================
  // UTILIDADES
  // ============================================================

  function normalizeTargets(raw) {
    const text = String(raw || '').trim();

    if (!text) return [];

    return text
      .split(/[\s,]+/g)
      .map(item => item.trim())
      .filter(Boolean)
      .filter((item, index, arr) => arr.indexOf(item) === index)
      .map(item => item.replace(/^@/, ''));
  }


  /**
   * Reemplaza strings y comentarios por espacios,
   * conservando exactamente las posiciones del texto original.
   *
   * Esto permite analizar llaves/paréntesis sin que interfieran:
   *
   * "texto { }"
   * '// comentario'
   * '/* comentario */
  function maskStringsAndComments(text) {
    const source = String(text || '');
    let out = '';

    let inString = null;
    let inLineComment = false;
    let inBlockComment = false;
    let escaped = false;

    for (let i = 0; i < source.length; i++) {
      const char = source[i];
      const next = source[i + 1];

      // -----------------------------
      // Comentario //
      // -----------------------------
      if (inLineComment) {
        if (char === '\n') {
          inLineComment = false;
          out += '\n';
        } else {
          out += ' ';
        }

        continue;
      }

      // -----------------------------
      // Comentario /* */
      // -----------------------------
      if (inBlockComment) {
        if (char === '*' && next === '/') {
          out += '  ';
          i++;
          inBlockComment = false;
        } else {
          out += char === '\n' ? '\n' : ' ';
        }

        continue;
      }

      // -----------------------------
      // String
      // -----------------------------
      if (inString) {
        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if (char === inString) {
          inString = null;
        }

        out += char === '\n' ? '\n' : ' ';
        continue;
      }

      // -----------------------------
      // Inicio comentario
      // -----------------------------
      if (char === '/' && next === '/') {
        out += '  ';
        i++;
        inLineComment = true;
        continue;
      }

      if (char === '/' && next === '*') {
        out += '  ';
        i++;
        inBlockComment = true;
        continue;
      }

      // -----------------------------
      // Inicio string
      // -----------------------------
      if (
        char === '"' ||
        char === "'" ||
        char === '`'
      ) {
        out += ' ';
        inString = char;
        continue;
      }

      out += char;
    }

    return out;
  }


  // ============================================================
  // MATCH DE PARES
  // ============================================================

  function findMatchingPair(
    masked,
    openIndex,
    openChar,
    closeChar
  ) {
    if (
      openIndex < 0 ||
      masked[openIndex] !== openChar
    ) {
      return -1;
    }

    let depth = 0;

    for (let i = openIndex; i < masked.length; i++) {
      const char = masked[i];

      if (char === openChar) {
        depth++;
      }

      if (char === closeChar) {
        depth--;

        if (depth === 0) {
          return i;
        }
      }
    }

    return -1;
  }


  function findMatchingBrace(masked, openIndex) {
    return findMatchingPair(
      masked,
      openIndex,
      '{',
      '}'
    );
  }


  function findMatchingParen(masked, openIndex) {
    return findMatchingPair(
      masked,
      openIndex,
      '(',
      ')'
    );
  }


  // ============================================================
  // LLAMADAS
  // ============================================================

  function extractLlamadas(
    bloque,
    nombreFuncionActual
  ) {
    const llamadas = new Set();

    const source = maskStringsAndComments(bloque);

    const currentName = String(
      nombreFuncionActual || ''
    )
      .split('.')
      .pop();

    /*
     * Detecta:
     *
     * funcion()
     * this.funcion()
     * servicio.funcion()
     * this.servicio.funcion()
     * objeto.a.b.funcion()
     */

    const callRegex =
      /\b((?:this\.)?[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*)*)\s*\(/g;

    const ignorar = new Set([
      'if',
      'for',
      'while',
      'switch',
      'catch',
      'function',
      'constructor',
      'return',
      'typeof',
      'new'
    ]);

    let match;

    while ((match = callRegex.exec(source)) !== null) {
      let llamada = match[1];

      // Quitar this.
      llamada = llamada.replace(/^this\./, '');

      const simpleName =
        llamada.split('.').pop() || llamada;

      if (ignorar.has(simpleName)) {
        continue;
      }

      /*
       * IMPORTANTE:
       *
       * Solo ignoramos autorreferencia directa:
       *
       * eliminarFiscalizacion()
       *
       * NO ignoramos:
       *
       * fiscalizacionService.eliminarFiscalizacion()
       *
       * porque es otra función.
       */

      if (
        !llamada.includes('.') &&
        llamada === currentName
      ) {
        continue;
      }

      llamadas.add(llamada);
    }

    return [...llamadas];
  }


  // ============================================================
  // CLASES
  // ============================================================

  function extractClasses(texto, masked) {
    const classes = [];

    const classRegex =
      /\b(?:export\s+)?(?:default\s+)?class\s+([A-Za-z_$][\w$]*)[^{]*\{/g;

    let match;

    while ((match = classRegex.exec(masked)) !== null) {
      const className = match[1];

      const openIndex =
        match.index +
        match[0].lastIndexOf('{');

      const closeIndex =
        findMatchingBrace(masked, openIndex);

      if (closeIndex === -1) {
        continue;
      }

      classes.push({
        name: className,
        bodyStart: openIndex,
        bodyEnd: closeIndex
      });
    }

    return classes;
  }


  // ============================================================
  // DETECTAR MÉTODOS DE CLASE
  // ============================================================

  function extractClassMethods(
    texto,
    masked,
    classInfo
  ) {
    const methods = [];

    /*
     * Buscamos posibles nombres seguidos por "(".
     *
     * NO intentamos capturar toda la firma con regex.
     *
     * Esto es importante porque algo como:
     *
     * public eliminarFiscalizacion(
     *   @Body() fiscalizacion: DTO,
     *   @UsuarioActual() usuario: Usuario
     * )
     *
     * contiene paréntesis internos.
     */

    const candidateRegex =
      /\b([A-Za-z_$][\w$]*)\s*\(/g;

    candidateRegex.lastIndex =
      classInfo.bodyStart + 1;

    let match;

    while (
      (match = candidateRegex.exec(masked)) !== null
    ) {
      if (match.index >= classInfo.bodyEnd) {
        break;
      }

      const methodName = match[1];

      if (
        [
          'if',
          'for',
          'while',
          'switch',
          'catch',
          'constructor',
          'function'
        ].includes(methodName)
      ) {
        continue;
      }

      const openParen =
        match.index +
        match[0].lastIndexOf('(');

      const closeParen =
        findMatchingParen(masked, openParen);

      if (
        closeParen === -1 ||
        closeParen > classInfo.bodyEnd
      ) {
        continue;
      }

      /*
       * Después de ")" puede venir:
       *
       * {
       *
       * : void {
       *
       * : Promise<Algo> {
       *
       * buscamos la llave de apertura.
       */

      let cursor = closeParen + 1;

      while (
        cursor < classInfo.bodyEnd &&
        /\s/.test(masked[cursor])
      ) {
        cursor++;
      }

      /*
       * Si hay tipo de retorno:
       *
       * ): Promise<void> {
       *
       * avanzamos hasta encontrar {.
       *
       * Pero si encontramos ;, =, ) etc.,
       * probablemente NO estamos frente
       * a una declaración de método.
       */

      let bodyStart = -1;

      if (masked[cursor] === '{') {
        bodyStart = cursor;
      } else if (masked[cursor] === ':') {
        let genericDepth = 0;

        cursor++;

        for (
          ;
          cursor < classInfo.bodyEnd;
          cursor++
        ) {
          const char = masked[cursor];

          if (char === '<') {
            genericDepth++;
            continue;
          }

          if (char === '>') {
            if (genericDepth > 0) {
              genericDepth--;
            }
            continue;
          }

          if (
            char === '{' &&
            genericDepth === 0
          ) {
            bodyStart = cursor;
            break;
          }

          if (
            genericDepth === 0 &&
            (
              char === ';' ||
              char === '='
            )
          ) {
            break;
          }
        }
      }

      if (bodyStart === -1) {
        continue;
      }

      const bodyEnd =
        findMatchingBrace(masked, bodyStart);

      if (
        bodyEnd === -1 ||
        bodyEnd > classInfo.bodyEnd
      ) {
        continue;
      }

      /*
       * Verificar que el candidato sea realmente
       * una declaración de método.
       *
       * Evita interpretar:
       *
       * this.servicio.metodo()
       *
       * como declaración.
       */

      const beforeName =
        masked.slice(
          Math.max(
            classInfo.bodyStart + 1,
            match.index - 120
          ),
          match.index
        );

      const trimmedBefore =
        beforeName.trimEnd();

      if (
        trimmedBefore.endsWith('.') ||
        trimmedBefore.endsWith('new')
      ) {
        continue;
      }

      const body = texto.slice(
        bodyStart + 1,
        bodyEnd
      );

      methods.push({
        nombre: methodName,
        tipo: 'method',
        inicio: match.index,
        bodyStart,
        bodyEnd,
        llamadas: extractLlamadas(
          body,
          methodName
        )
      });

      /*
       * Saltamos hasta el final del método.
       *
       * Esto evita detectar llamadas internas
       * como nuevos métodos.
       */

      candidateRegex.lastIndex =
        bodyEnd + 1;
    }

    return methods;
  }


  // ============================================================
  // FUNCIONES NORMALES
  // ============================================================

  function extractStandaloneFunctions(
    texto,
    masked,
    classes
  ) {
    const functions = [];

    const regex =
      /\b(?:export\s+)?(?:async\s+)?function\s+([A-Za-z_$][\w$]*)\s*\(/g;

    let match;

    while ((match = regex.exec(masked)) !== null) {
      /*
       * Si está dentro de una clase,
       * no corresponde.
       */

      const insideClass = classes.some(
        cls =>
          match.index > cls.bodyStart &&
          match.index < cls.bodyEnd
      );

      if (insideClass) {
        continue;
      }

      const name = match[1];

      const openParen =
        match.index +
        match[0].lastIndexOf('(');

      const closeParen =
        findMatchingParen(masked, openParen);

      if (closeParen === -1) {
        continue;
      }

      const bodyStart =
        masked.indexOf('{', closeParen);

      if (bodyStart === -1) {
        continue;
      }

      const bodyEnd =
        findMatchingBrace(masked, bodyStart);

      if (bodyEnd === -1) {
        continue;
      }

      const body = texto.slice(
        bodyStart + 1,
        bodyEnd
      );

      functions.push({
        nombre: name,
        tipo: 'function',
        inicio: match.index,
        bodyStart,
        bodyEnd,
        llamadas: extractLlamadas(
          body,
          name
        )
      });
    }

    return functions;
  }


  // ============================================================
  // EXTRAER FUNCIONES + LLAMADAS
  // ============================================================

  function extraerFuncionesYLlamadas(contenido) {
    const texto = String(contenido || '');

    /*
     * IMPORTANTE:
     *
     * No eliminamos comentarios del texto original,
     * porque hacerlo cambia los índices.
     *
     * Creamos una copia "masked" que conserva
     * exactamente las posiciones.
     */

    const masked =
      maskStringsAndComments(texto);

    const classes =
      extractClasses(texto, masked);

    const funciones = [];

    // -----------------------------
    // Métodos de clases
    // -----------------------------

    for (const classInfo of classes) {
      const methods =
        extractClassMethods(
          texto,
          masked,
          classInfo
        );

      funciones.push(...methods);
    }

    // -----------------------------
    // Funciones standalone
    // -----------------------------

    funciones.push(
      ...extractStandaloneFunctions(
        texto,
        masked,
        classes
      )
    );

    funciones.sort(
      (a, b) => a.inicio - b.inicio
    );

    return funciones;
  }


  // ============================================================
  // IMPORTS LOCALES
  // ============================================================

  function extractLocalImports(texto) {
    const imports = new Map();

    /*
     * Solo imports relativos:
     *
     * ./...
     * ../...
     *
     * Ignoramos:
     *
     * @angular
     * @nestjs
     * rxjs
     * fs
     * cesium
     * etc.
     */

    const regex =
      /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g;

    let match;

    while ((match = regex.exec(texto)) !== null) {
      const source = match[2];

      if (
        !source.startsWith('./') &&
        !source.startsWith('../')
      ) {
        continue;
      }

      const names = match[1]
        .split(',')
        .map(value => value.trim())
        .filter(Boolean);

      for (const item of names) {
        /*
         * soporta:
         *
         * import { X }
         * import { X as Y }
         */

        const parts =
          item.split(/\s+as\s+/i);

        const localName =
          parts[parts.length - 1].trim();

        imports.set(localName, source);
      }
    }

    return imports;
  }


  // ============================================================
  // DEPENDENCIAS INYECTADAS
  // ============================================================

  function extractInjectedDependencies(
    texto,
    masked,
    localImports
  ) {
    const dependencies = new Map();

    const constructorRegex =
      /\bconstructor\s*\(/g;

    const match =
      constructorRegex.exec(masked);

    if (!match) {
      return dependencies;
    }

    const openParen =
      match.index +
      match[0].lastIndexOf('(');

    const closeParen =
      findMatchingParen(masked, openParen);

    if (closeParen === -1) {
      return dependencies;
    }

    const params = texto.slice(
      openParen + 1,
      closeParen
    );

    /*
     * Ejemplo:
     *
     * private readonly fiscalizacionService:
     * FiscalizacionService
     */

    const paramRegex =
      /(?:(?:public|private|protected)\s+)?(?:readonly\s+)?([A-Za-z_$][\w$]*)\s*:\s*([A-Za-z_$][\w$]*)/g;

    let paramMatch;

    while (
      (paramMatch = paramRegex.exec(params)) !== null
    ) {
      const variableName =
        paramMatch[1];

      const typeName =
        paramMatch[2];

      const source =
        localImports.get(typeName);

      if (!source) {
        continue;
      }

      dependencies.set(
        variableName,
        source
      );
    }

    return dependencies;
  }


  // ============================================================
  // REFS
  // ============================================================

  function extractRefsFromFunctions(
    texto,
    funciones
  ) {
    const masked =
      maskStringsAndComments(texto);

    const localImports =
      extractLocalImports(texto);

    const injected =
      extractInjectedDependencies(
        texto,
        masked,
        localImports
      );

    const refs = new Map();

    /*
     * Solo agregamos una ref si realmente aparece
     * como raíz de una llamada.
     *
     * fiscalizacionService.obtenerArchivo
     *
     * raíz:
     *
     * fiscalizacionService
     */

    for (const fn of funciones) {
      for (const call of fn.llamadas || []) {
        const normalized =
          String(call || '')
            .replace(/^this\./, '')
            .trim();

        if (!normalized) {
          continue;
        }

        const root =
          normalized.split('.')[0];

        // Dependencia inyectada
        if (injected.has(root)) {
          refs.set(
            root,
            injected.get(root)
          );

          continue;
        }

        /*
         * Función importada directamente:
         *
         * validarArchivo()
         *
         * import {
         *   validarArchivo
         * } from './utils'
         */

        if (
          !normalized.includes('.') &&
          localImports.has(root)
        ) {
          refs.set(
            root,
            localImports.get(root)
          );
        }
      }
    }

    return [...refs.entries()]
      .map(([name, source]) => ({
        name,
        source
      }))
      .sort(
        (a, b) =>
          a.name.localeCompare(
            b.name,
            'es',
            {
              sensitivity: 'base'
            }
          )
      );
  }


  // ============================================================
  // FILTRO DE ARCHIVOS
  // ============================================================

  function matchesTarget(entry, target) {
    const normalized =
      String(target || '')
        .trim()
        .toLowerCase();

    if (!normalized) {
      return true;
    }

    const name =
      String(entry.name || '')
        .toLowerCase();

    const path =
      String(entry.path || '')
        .toLowerCase();

    const baseName =
      path.split(/[\\/]/g).pop() || name;

    return (
      name === normalized ||
      baseName === normalized ||
      path.endsWith('/' + normalized) ||
      path.endsWith('\\' + normalized) ||
      path.includes('/' + normalized) ||
      path.includes('\\' + normalized) ||
      path.includes(normalized)
    );
  }


  // ============================================================
  // GRAPH
  // ============================================================

  function buildGraphLookup(graph) {
    const byId = new Map();

    (graph?.nodes || []).forEach(node => {
      byId.set(node.id, node);
    });

    return byId;
  }


  function buildFunctionGraph(
    files,
    targetNames = []
  ) {
    const selected =
      Array.isArray(files)
        ? files
        : [];

    const targets =
      normalizeTargets(targetNames);

    const nodes = [];
    const edges = [];
    const fileSummaries = [];

    const selectedFiles =
      targets.length
        ? selected.filter(file =>
            targets.some(target =>
              matchesTarget(file, target)
            )
          )
        : selected;

    // Índice global
    const functionIndex = new Map();

    // ========================================================
    // PRIMERA PASADA
    // ========================================================

    selectedFiles.forEach(
      (file, index) => {
        const fileName =
          String(
            file?.name ||
            file?.path ||
            `archivo-${index}`
          );

        const filePath =
          String(
            file?.path ||
            fileName
          );

        const content =
          String(
            file?.content || ''
          );

        const functions =
          extraerFuncionesYLlamadas(
            content
          );

        const refs =
          extractRefsFromFunctions(
            content,
            functions
          );

        const fileNodeId =
          `file:${filePath}`;

        nodes.push({
          id: fileNodeId,
          type: 'file',
          label: fileName,
          path: filePath,
          refs
        });

        fileSummaries.push({
          path: filePath,
          name: fileName,
          refs,
          functions
        });

        functions.forEach(
          (fn, fnIndex) => {
            const fnNodeId =
              `fn:${filePath}:${fn.nombre}:${fnIndex}`;

            /*
             * Como ahora no repetimos clase,
             * indexamos por nombre simple.
             */

            functionIndex.set(
              `${filePath}:${fn.nombre}`,
              fnNodeId
            );

            const existing =
              functionIndex.get(fn.nombre);

            if (!existing) {
              functionIndex.set(
                fn.nombre,
                fnNodeId
              );
            }

            nodes.push({
              id: fnNodeId,
              type:
                fn.tipo || 'function',
              label: fn.nombre,
              file: fileName,
              path: filePath,
              calls: fn.llamadas
            });

            edges.push({
              from: fileNodeId,
              to: fnNodeId,
              type: 'declares'
            });
          }
        );
      }
    );


    // ========================================================
    // SEGUNDA PASADA - CALL EDGES
    // ========================================================

    fileSummaries.forEach(file => {
      file.functions.forEach(
        (fn, fnIndex) => {
          const fromNodeId =
            functionIndex.get(
              `${file.path}:${fn.nombre}`
            );

          if (!fromNodeId) {
            return;
          }

          for (
            const callName of fn.llamadas
          ) {
            const simpleName =
              callName
                .split('.')
                .pop();

            const targetNodeId =
              functionIndex.get(
                callName
              ) ||
              functionIndex.get(
                simpleName
              );

            if (!targetNodeId) {
              continue;
            }

            edges.push({
              from: fromNodeId,
              to: targetNodeId,
              type: 'calls',
              label: callName
            });
          }
        }
      );
    });


    return {
      nodes,
      edges,
      lookup: buildGraphLookup({
        nodes,
        edges
      }),
      files: fileSummaries
    };
  }


  // ============================================================
  // FORMATO DE JERARQUÍA
  // ============================================================

  function formatHierarchy(graph) {
    const lines = [];

    const files =
      graph?.files || [];

    files.forEach(
      (file, fileIndex) => {
        lines.push(file.path);

        // -----------------------------
        // refs
        // -----------------------------

        if (
          Array.isArray(file.refs) &&
          file.refs.length
        ) {
          lines.push('  refs');

          for (const ref of file.refs) {
            lines.push(
              `    ${ref.name} -> ${ref.source}`
            );
          }

          lines.push('');
        }

        // -----------------------------
        // funciones
        // -----------------------------

        for (
          const fn of file.functions || []
        ) {
          const llamadas =
            Array.isArray(fn.llamadas)
              ? fn.llamadas
              : [];

          if (llamadas.length) {
            lines.push(
              `  ${fn.nombre} -> ${llamadas.join(', ')}`
            );
          } else {
            lines.push(
              `  ${fn.nombre}`
            );
          }
        }

        if (
          fileIndex <
          files.length - 1
        ) {
          lines.push('');
        }
      }
    );

    return lines.join('\n');
  }


  // ============================================================
  // API
  // ============================================================

  async function indexFiles({
    files,
    targetNames = []
  }) {
    return buildFunctionGraph(
      files,
      targetNames
    );
  }


  window.nanochatTsIndexer = {
    normalizeTargets,

    extraerFuncionesYLlamadas,

    extractRefsFromFunctions,

    buildFunctionGraph,

    buildGraphLookup,

    formatHierarchy,

    indexFiles
  };

})();