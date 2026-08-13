(function () {
  const DB_NAME = 'nanochat-folder-handles';
  const DB_VERSION = 1;
  const STORE_NAME = 'directory-handles';

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

  function createFolderNode(name, path) {
    return { type: 'folder', name: name || '', path: path || '', children: [] };
  }

  function createFileNode(name, path, file) {
    const node = {
      type: 'file',
      name: name || path.split('/').pop() || 'archivo',
      path,
      size: Number(file?.size) || 0,
      mimeType: String(file?.type || ''),
      previewable: Boolean(/\.(txt|sql|json|ps1)$/i.test(String(name || '')))
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

  async function openDb() {
    return await new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  async function setStoredHandle(key, handle) {
    if (!key || !handle) return;
    const db = await openDb();
    await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      tx.objectStore(STORE_NAME).put(handle, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
  }

  async function getStoredHandle(key) {
    if (!key) return null;
    try {
      const db = await openDb();
      const value = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(key);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
      });
      db.close();
      return value;
    } catch (error) {
      return null;
    }
  }

  async function readDirectoryHandle(handle, rootName, rootPath) {
    const root = createFolderNode(rootName || handle?.name || 'Carpeta seleccionada', rootPath || handle?.name || '');
    const filesByPath = new Map();

    async function walk(directoryHandle, parentNode, parentPath) {
      for await (const entry of directoryHandle.values()) {
        const entryPath = parentPath ? parentPath + '/' + entry.name : entry.name;
        if (entry.kind === 'directory') {
          const folderNode = createFolderNode(entry.name, entryPath);
          parentNode.children.push(folderNode);
          await walk(entry, folderNode, entryPath);
        } else if (entry.kind === 'file') {
          const file = await entry.getFile();
          filesByPath.set(entryPath, entry);
          parentNode.children.push(createFileNode(entry.name, entryPath, file));
        }
      }
    }

    await walk(handle, root, '');
    Object.defineProperty(root, 'filesByPath', {
      value: filesByPath,
      enumerable: false,
      configurable: true
    });
    return root;
  }

  function countFiles(node) {
    if (!node) return 0;
    if (node.type === 'file') return 1;
    return Array.isArray(node.children) ? node.children.reduce((sum, child) => sum + countFiles(child), 0) : 0;
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
    if (Array.isArray(node.children)) node.children.forEach(child => flattenFiles(child, output));
    return output;
  }

  function renderNodeList(children) {
    if (!Array.isArray(children) || !children.length) return '';
    return '<ul class="folder-tree-list">'
      + children.map(child => {
        if (child.type === 'file') {
          const labelHtml = child.previewable
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
    if (!tree) return '<div class="folder-tree-empty">Selecciona una carpeta para ver su contenido.</div>';
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

  async function selectDirectory(options = {}) {
    try {
      if (typeof window.showDirectoryPicker !== 'function') return null;
      const handle = await window.showDirectoryPicker({ mode: 'read', startIn: options.startIn || 'documents' });
      if (!handle) return null;
      const tree = await readDirectoryHandle(handle, handle.name, handle.name);
      return {
        name: handle.name || tree.name,
        handle,
        tree,
        fileCount: countFiles(tree),
        selectedAt: Date.now()
      };
    } catch (error) {
      if (error && error.name === 'AbortError') return null;
      return null;
    }
  }

  async function restoreDirectorySelection(key) {
    const handle = await getStoredHandle(key);
    if (!handle) return null;
    try {
      if (typeof handle.queryPermission === 'function') {
        const permission = await handle.queryPermission({ mode: 'read' });
        if (permission !== 'granted' && typeof handle.requestPermission === 'function') {
          const requested = await handle.requestPermission({ mode: 'read' });
          if (requested !== 'granted') return null;
        }
      }
      const tree = await readDirectoryHandle(handle, handle.name, handle.name);
      return {
        name: handle.name || tree.name,
        handle,
        tree,
        fileCount: countFiles(tree),
        selectedAt: Date.now()
      };
    } catch (error) {
      return null;
    }
  }

  async function rememberDirectorySelection(key, selection) {
    if (!key || !selection?.handle) return;
    await setStoredHandle(key, selection.handle);
  }

  window.nanochatFolderBrowser = {
    selectDirectory,
    restoreDirectorySelection,
    rememberDirectorySelection,
    renderDirectoryTreeHtml,
    flattenFiles
  };
})();
