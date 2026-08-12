(function () {
  const moduleUrl = 'https://unpkg.com/browser-fs-access?module';
  let modulePromise = null;

  function escapeHtml(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function formatSize(bytes) {
    const size = Number(bytes) || 0;
    if (size <= 0) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let unitIndex = 0;
    let value = size;
    while (value >= 1024 && unitIndex < units.length - 1) {
      value /= 1024;
      unitIndex++;
    }
    return value >= 10 || unitIndex === 0
      ? Math.round(value) + ' ' + units[unitIndex]
      : value.toFixed(1) + ' ' + units[unitIndex];
  }

  function getRelativePath(file) {
    return String(file?.webkitRelativePath || file?.relativePath || file?.name || '').replace(/^\/+/, '');
  }

  function sortFolderChildren(node) {
    if (!node || !Array.isArray(node.children)) return node;
    node.children.sort((a, b) => {
      if (a.type !== b.type) return a.type === 'folder' ? -1 : 1;
      return String(a.name || '').localeCompare(String(b.name || ''), 'es', { sensitivity: 'base' });
    });
    node.children.forEach(child => sortFolderChildren(child));
    return node;
  }

  function createFolderNode(name, path) {
    return {
      type: 'folder',
      name: name || '',
      path: path || '',
      children: []
    };
  }

  function createFileNode(file, path) {
    const node = {
      type: 'file',
      name: file?.name || path.split('/').pop() || 'archivo',
      path,
      size: Number(file?.size) || 0,
      mimeType: String(file?.type || ''),
      previewable: Boolean(file?.previewable || isPreviewableFile(file))
    };
    if (file) {
      Object.defineProperty(node, 'fileRef', {
        value: file,
        enumerable: false,
        configurable: true
      });
    }
    return node;
  }

  function isPreviewableFile(file) {
    const name = String(file?.name || '').toLowerCase();
    return /\.(txt|sql|json)$/i.test(name);
  }

  async function readFileText(file) {
    if (!file) return '';
    if (typeof file.text === 'function') {
      try {
        return await file.text();
      } catch (error) { }
    }
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  }

  async function buildTree(files) {
    const list = Array.isArray(files) ? files.filter(Boolean) : [];
    const firstPath = getRelativePath(list[0]);
    const rootName = firstPath.split('/').filter(Boolean)[0] || 'Carpeta seleccionada';
    const root = createFolderNode(rootName, rootName);
    const filesByPath = new Map();

    for (const file of list) {
      const rawPath = getRelativePath(file);
      if (!rawPath) continue;
      const segments = rawPath.split('/').filter(Boolean);
      const relativeSegments = segments[0] === rootName ? segments.slice(1) : segments;
      if (!relativeSegments.length) {
        filesByPath.set(rawPath, file);
        root.children.push(createFileNode(file, rawPath));
        continue;
      }
      let cursor = root;
      let currentPath = rootName;

      relativeSegments.forEach((segment, index) => {
        const isLast = index === relativeSegments.length - 1;
        currentPath += '/' + segment;
        if (isLast) {
          filesByPath.set(currentPath, file);
          cursor.children.push(createFileNode(file, currentPath));
          return;
        }
        let nextNode = cursor.children.find(child => child.type === 'folder' && child.name === segment);
        if (!nextNode) {
          nextNode = createFolderNode(segment, currentPath);
          cursor.children.push(nextNode);
        }
        cursor = nextNode;
      });
    }

    Object.defineProperty(root, 'filesByPath', {
      value: filesByPath,
      enumerable: false,
      configurable: true
    });

    return sortFolderChildren(root);
  }

  function countFiles(node) {
    if (!node) return 0;
    if (node.type === 'file') return 1;
    return Array.isArray(node.children)
      ? node.children.reduce((sum, child) => sum + countFiles(child), 0)
      : 0;
  }

  function flattenFiles(node, output = []) {
    if (!node) return output;
    if (node.type === 'file') {
      output.push({
        name: node.name || 'archivo',
        path: node.path || node.name || 'archivo',
        size: Number(node.size) || 0
      });
      return output;
    }
    if (Array.isArray(node.children)) {
      node.children.forEach(child => flattenFiles(child, output));
    }
    return output;
  }

  function renderNodeList(children) {
    if (!Array.isArray(children) || !children.length) return '';
    return '<ul class="folder-tree-list">'
      + children.map(child => {
        if (child.type === 'file') {
          const isPreviewable = Boolean(child.previewable);
          const labelHtml = isPreviewable
            ? '<a href="#" class="folder-tree-file-link" data-file-path="' + escapeHtml(child.path) + '" data-file-previewable="1">' + escapeHtml(child.name) + '</a>'
            : '<span>' + escapeHtml(child.name) + '</span>';
          return '<li class="folder-tree-item folder-tree-file">'
            + '<span class="folder-tree-label">📄 ' + labelHtml + '</span>'
            + '<span class="folder-tree-meta">' + escapeHtml(formatSize(child.size)) + '</span>'
            + '</li>';
        }
        return '<li class="folder-tree-branch">'
          + '<div class="folder-tree-item folder-tree-folder">'
          + '<span class="folder-tree-label">📁 ' + escapeHtml(child.name) + '</span>'
          + '<span class="folder-tree-meta">' + escapeHtml((Array.isArray(child.children) ? child.children.length : 0) + ' items') + '</span>'
          + '</div>'
          + renderNodeList(child.children)
          + '</li>';
      }).join('')
      + '</ul>';
  }

  function renderDirectoryTreeHtml(tree) {
    if (!tree) {
      return '<div class="folder-tree-empty">Selecciona una carpeta para ver su contenido.</div>';
    }
    const filesCount = countFiles(tree);
    return '<div class="folder-tree">'
      + '<div class="folder-tree-root">'
      + '<div class="folder-tree-root-head">'
      + '<span>📁 ' + escapeHtml(tree.name || 'Carpeta seleccionada') + '</span>'
      + '<span class="folder-tree-count">' + escapeHtml(filesCount + ' archivos') + '</span>'
      + '</div>'
      + renderNodeList(tree.children)
      + '</div>'
      + '</div>';
  }

  async function loadModule() {
    if (!modulePromise) {
      modulePromise = import(moduleUrl);
    }
    return modulePromise;
  }

  async function selectDirectory(options = {}) {
    try {
      const api = await loadModule();
      if (!api || typeof api.directoryOpen !== 'function') return null;
      const files = await api.directoryOpen({
        recursive: true,
        mode: 'read',
        startIn: options.startIn || 'documents'
      });
      if (!Array.isArray(files) || !files.length) return null;
      const tree = await buildTree(files);
      const filesByPath = tree && tree.filesByPath instanceof Map ? tree.filesByPath : null;
      return {
        name: tree.name,
        tree,
        filesByPath,
        fileCount: countFiles(tree),
        selectedAt: Date.now()
      };
    } catch (error) {
      if (error && error.name === 'AbortError') return null;
      return null;
    }
  }

  window.nanochatFolderBrowser = {
    selectDirectory,
    renderDirectoryTreeHtml,
    buildTree,
    flattenFiles
  };
})();
