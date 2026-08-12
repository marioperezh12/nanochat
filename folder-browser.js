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
    return {
      type: 'file',
      name: file?.name || path.split('/').pop() || 'archivo',
      path,
      size: Number(file?.size) || 0
    };
  }

  function buildTree(files) {
    const list = Array.isArray(files) ? files.filter(Boolean) : [];
    const firstPath = getRelativePath(list[0]);
    const rootName = firstPath.split('/').filter(Boolean)[0] || 'Carpeta seleccionada';
    const root = createFolderNode(rootName, rootName);

    list.forEach(file => {
      const rawPath = getRelativePath(file);
      if (!rawPath) return;
      const segments = rawPath.split('/').filter(Boolean);
      const relativeSegments = segments[0] === rootName ? segments.slice(1) : segments;
      if (!relativeSegments.length) {
        root.children.push(createFileNode(file, rawPath));
        return;
      }
      let cursor = root;
      let currentPath = rootName;

      relativeSegments.forEach((segment, index) => {
        const isLast = index === relativeSegments.length - 1;
        currentPath += '/' + segment;
        if (isLast) {
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
          return '<li class="folder-tree-item folder-tree-file">'
            + '<span class="folder-tree-label">📄 ' + escapeHtml(child.name) + '</span>'
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
      const tree = buildTree(files);
      return {
        name: tree.name,
        tree,
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
