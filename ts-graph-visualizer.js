(function () {
  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function normalizeGraph(graph) {
    const nodes = Array.isArray(graph?.nodes) ? graph.nodes : [];
    const edges = Array.isArray(graph?.edges) ? graph.edges : [];
    const fileNodes = nodes.filter(node => node.type === 'file');
    const functionNodes = nodes.filter(node => node.type !== 'file');
    return { nodes, edges, fileNodes, functionNodes };
  }

  function buildTreeText(node) {
    const calls = Array.isArray(node.calls) ? node.calls : [];
    const label = node.label || node.id || 'nodo';
    const kind = node.type || 'function';

    if (kind === 'file') {
      const childLabel = node.path || 'archivo';
      return label + '\n└── ' + childLabel;
    }

    const lines = [label + ' [' + kind + ']'];
    if (!calls.length) {
      lines.push('└── Sin llamadas detectadas');
      return lines.join('\n');
    }
    calls.forEach((call, index) => {
      const branch = index === calls.length - 1 ? '└──' : '├──';
      lines.push(branch + ' ' + call);
    });
    return lines.join('\n');
  }

  function buildBodyHtml(node) {
    return '<div class="workspace-three-index-panel-shell">'
      + '<pre class="workspace-three-index-panel-tree">' + escapeHtml(buildTreeText(node)) + '</pre>'
      + '</div>';
  }

  function distributeByFile(fileNodes, functionNodes) {
    const placements = new Map();
    const fileRowGap = 260;
    const fnColGap = 320;
    const fnRowGap = 190;
    const leftX = 80;
    const functionStartX = 430;

    fileNodes.forEach((node, index) => {
      placements.set(node.id, { x: leftX, y: 80 + index * fileRowGap });
    });

    const grouped = new Map();
    functionNodes.forEach(node => {
      const key = String(node.file || node.path || 'archivo');
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key).push(node);
    });

    const fileIndexByKey = new Map();
    fileNodes.forEach((node, index) => {
      const key = String(node.path || node.label || node.id);
      fileIndexByKey.set(key, index);
      fileIndexByKey.set(String(node.label || node.path || node.id), index);
    });

    grouped.forEach((items, fileKey) => {
      const fileIndex = fileIndexByKey.get(String(fileKey)) ?? 0;
      const baseY = 80 + fileIndex * fileRowGap;
      items.forEach((node, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        placements.set(node.id, {
          x: functionStartX + column * fnColGap,
          y: baseY + row * fnRowGap
        });
      });
    });

    return placements;
  }

  function connectGraph(api, created, edges) {
    const lookup = new Map(created.map(entry => [entry.id, entry.state]));
    edges.forEach(edge => {
      const from = lookup.get(edge.from);
      const to = lookup.get(edge.to);
      if (from && to) api.connectNodes(from, to);
    });
  }

  function render(graph, options = {}) {
    const api = window.nanochatWorkspaceThree;
    const canvas = document.getElementById('workspaceThreeCanvas');
    if (!api || typeof api.createIndexNode !== 'function' || typeof api.connectNodes !== 'function' || !canvas) return null;

    if (typeof api.clear === 'function') {
      api.clear();
    }

    const { fileNodes, functionNodes, edges } = normalizeGraph(graph);
    const placements = distributeByFile(fileNodes, functionNodes);
    const created = [];

    fileNodes.forEach(node => {
      const pos = placements.get(node.id) || { x: 120, y: 120 };
      const state = api.createIndexNode({
        id: node.id,
        title: node.label || node.id,
        subtitle: node.path || 'archivo',
        kind: 'archivo',
        bodyHtml: buildBodyHtml(node),
        x: pos.x,
        y: pos.y
      });
      if (state) created.push({ id: node.id, state });
    });

    functionNodes.forEach(node => {
      const pos = placements.get(node.id) || { x: 500, y: 120 };
      const state = api.createIndexNode({
        id: node.id,
        title: node.label || node.id,
        subtitle: (node.file || node.path || 'archivo') + (Array.isArray(node.calls) && node.calls.length ? ' · ' + node.calls.length + ' llamadas' : ''),
        kind: node.type || 'function',
        bodyHtml: buildBodyHtml(node),
        x: pos.x,
        y: pos.y
      });
      if (state) created.push({ id: node.id, state });
    });

    connectGraph(api, created, edges);

    if (options.chat) {
      options.chat.statusMessage = [
        'Vista jerárquica generada en Workspace Three.',
        'Archivos: ' + fileNodes.length,
        'Funciones: ' + functionNodes.length
      ].join('\n');
    }

    const section = document.getElementById('workspaceThreeSection');
    if (section) section.hidden = false;

    return {
      fileNodes: fileNodes.length,
      functionNodes: functionNodes.length
    };
  }

  window.nanochatTsGraphVisualizer = {
    render
  };
})();
