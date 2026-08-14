(function () {
  const COMMANDS = [
    { name: 'contexto', path: 'contexto', desc: 'Fija un mensaje de contexto siempre visible al inicio del chat' },
    { name: 'contexto+', path: 'contexto+', desc: 'Agrega información al contexto actual del chat' },
    { name: 'mensajes', path: 'mensajes', desc: 'Lista accesos a mensajes del chat y permite encadenarlos' },
    { name: 'anclar-archivo', path: 'anclar-archivo', desc: 'Escribe el comando y luego menciona un archivo para anclarlo' },
    { name: 'branch', path: 'branch', desc: 'Crea un nuevo chat derivado del actual, opcionalmente con una instrucción inicial' },
    { name: 'preview', path: 'preview', desc: 'Carga un archivo mencionado en el panel de vista previa' },
    { name: 'limpiar', path: 'limpiar', desc: 'Elimina todos los mensajes de la versión actual sin borrar el contexto' },
    { name: 'indexar-archivo', path: 'indexar-archivo', desc: 'Indexa un archivo TypeScript, JavaScript o CSS y permite encadenar el resultado' },
    { name: 'indexar-archivos', path: 'indexar-archivos', desc: 'Indexa archivos TypeScript, JavaScript o CSS de la carpeta' },
    { name: 'indexar-archivo-recursivo', path: 'indexar-archivo-recursivo', desc: 'Indexa un archivo y sigue refs locales sin repetir archivos ya resueltos' },
    { name: 'indexar-archivos-recursivo', path: 'indexar-archivos-recursivo', desc: 'Indexa archivos y sigue refs locales sin repetir archivos ya resueltos' },
    { name: 'ramas-paralelas', path: 'ramas-paralelas', desc: 'Crea ramas hijas paralelas desde este chat' },
    { name: 'ramas-secuenciales', path: 'ramas-secuenciales', desc: 'Crea una cadena secuencial de ramas hacia la derecha' },
    { name: 'multi-ia', path: 'multi-ia', desc: 'Consulta varios motores con el mismo mensaje' },
    { name: 'resumen-anclados', path: 'resumen-anclados', desc: 'Resume solo los mensajes anclados de este chat' },
    { name: 'resumen-general', path: 'resumen-general', desc: 'Resume toda la conversacion de este chat' },
    { name: 'chatsversion', path: 'chatsversion', desc: 'Carga una version anterior guardada de este chat' },
    { name: 'eliminar', path: 'eliminar', desc: 'Elimina la conversacion actual o una version guardada' }
  ];

  const MENSAJES_SELECTORS = [
    { name: 'last-user', path: 'mensajes:last-user', desc: 'Mi último mensaje' },
    { name: 'last-assistant', path: 'mensajes:last-assistant', desc: 'Última respuesta de IA' },
    { name: 'first-user', path: 'mensajes:first-user', desc: 'Mi primer mensaje' },
    { name: 'first-assistant', path: 'mensajes:first-assistant', desc: 'Primera respuesta de IA' },
    { name: 'all', path: 'mensajes:all', desc: 'Todos los mensajes' }
  ];

  function normalizeText(value) {
    return String(value || '').trim();
  }

  function parseChainSyntax(text) {
    const source = String(text || '');
    if (!source.includes('->')) return null;
    const stages = source
      .split(/\s*->\s*/g)
      .map(stage => normalizeText(stage))
      .filter(Boolean);
    if (stages.length < 2) return null;
    return { stages };
  }

  function getCommandSuggestions(query) {
    const normalized = normalizeText(query).toLowerCase();
    if (normalized === 'mensajes' || normalized.startsWith('mensajes:')) {
      const selectorQuery = normalized.replace(/^mensajes:?/i, '').trim();
      return MENSAJES_SELECTORS
        .filter(item => !selectorQuery || item.name.toLowerCase().includes(selectorQuery) || item.path.toLowerCase().includes(selectorQuery))
        .sort((a, b) => {
          const aScore = a.name.toLowerCase().startsWith(selectorQuery) ? 0 : 1;
          const bScore = b.name.toLowerCase().startsWith(selectorQuery) ? 0 : 1;
          return aScore - bScore || a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
        });
    }
    return COMMANDS
      .filter(item => !normalized || item.name.toLowerCase().includes(normalized) || item.path.toLowerCase().includes(normalized))
      .sort((a, b) => {
        const aScore = a.name.toLowerCase().startsWith(normalized) ? 0 : 1;
        const bScore = b.name.toLowerCase().startsWith(normalized) ? 0 : 1;
        return aScore - bScore || a.name.localeCompare(b.name, 'es', { sensitivity: 'base' });
      });
  }

  function evaluate(text) {
    const rawText = String(text || '');
    const trimmed = normalizeText(rawText);
    if (!trimmed) return { kind: 'empty', rawText, text: trimmed };

    const commandMatchers = [
      { kind: 'contexto+', regex: /^\/contexto\+(?:\s+([\s\S]*))?$/is },
      { kind: 'contexto', regex: /^\/contexto(?:\s+([\s\S]*))?$/is },
      { kind: 'mensajes', regex: /^\/mensajes(?::([a-z-]+))?(?:\s+([\s\S]*))?$/i },
      { kind: 'limpiar', regex: /^\/limpiar(?:\s+([\s\S]*))?$/i },
      { kind: 'indexar-archivo', regex: /^\/indexar-archivo(?:\s+([\s\S]*))?$/i },
      { kind: 'indexar-archivos', regex: /^\/indexar-archivos(?:\s+([\s\S]*))?$/i },
      { kind: 'indexar-archivo-recursivo', regex: /^\/indexar-archivo-recursivo(?:\s+([\s\S]*))?$/i },
      { kind: 'indexar-archivos-recursivo', regex: /^\/indexar-archivos-recursivo(?:\s+([\s\S]*))?$/i },
      { kind: 'anclar-archivo', regex: /^\/anclar-archivo(?:\s+([\s\S]*))?$/i },
      { kind: 'branch', regex: /^\/branch(?:\s+([\s\S]*))?$/i },
      { kind: 'preview', regex: /^\/preview(?:\s+([\s\S]*))?$/i }
    ];

    for (const matcher of commandMatchers) {
      const match = trimmed.match(matcher.regex);
      if (match) {
        const argsText = matcher.kind === 'mensajes'
          ? normalizeText([match[1] ? ':' + match[1] : '', match[2] || ''].filter(Boolean).join(' '))
          : normalizeText(match[1] || '');
        return {
          kind: 'command',
          command: matcher.kind,
          argsText,
          rawText,
          text: trimmed
        };
      }
    }

    const singleMentionMatch = trimmed.match(/^@([^\s@]+)$/);
    if (singleMentionMatch) {
      return {
        kind: 'single-mention',
        mention: singleMentionMatch[1],
        rawText,
        text: trimmed
      };
    }

    const chain = parseChainSyntax(trimmed);
    if (chain) {
      return {
        kind: 'chain',
        stages: chain.stages,
        rawText,
        text: trimmed
      };
    }

    return { kind: 'text', rawText, text: trimmed };
  }

  window.nanochatInputRules = {
    commands: COMMANDS.slice(),
    parseChainSyntax,
    getCommandSuggestions,
    evaluate
  };
})();
