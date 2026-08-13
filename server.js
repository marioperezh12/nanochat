const http = require('http');
const fs = require('fs');
const path = require('path');
const { runPowerShell } = require('./powershell-exec');

const PORT = process.env.PORT || 3000;
const ROOT = __dirname;
const INDEX_PATH = path.join(ROOT, 'index.html');
const LOGIN_PATH = path.join(ROOT, 'login.html');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

function sendJson(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  });
  res.end(JSON.stringify(data));
}

function sendHtml(res, filePath) {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  fs.createReadStream(filePath).pipe(res);
}

function sendFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': contentType });
  fs.createReadStream(filePath).pipe(res);
}

function serveStatic(req, res) {
  const pathname = decodeURIComponent((req.url || '/').split('?')[0]);
  if (pathname === '/' || pathname === '/index.html') {
    return sendHtml(res, INDEX_PATH);
  }
  if (pathname === '/login.html') {
    return sendHtml(res, LOGIN_PATH);
  }
  const assetPath = path.normalize(path.join(ROOT, pathname.replace(/^\//, '')));
  if (assetPath.startsWith(ROOT) && fs.existsSync(assetPath) && fs.statSync(assetPath).isFile()) {
    return sendFile(res, assetPath);
  }
  sendJson(res, 404, { error: 'Not found' });
}

async function chatWithOpenAI({ apiKey, messages }) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4.1-mini',
      input: messages.map((message) => ({
        role: message.role,
        content: [{ type: 'input_text', text: message.content }],
      })),
    }),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || 'OpenAI request failed';
    throw new Error(message);
  }

  return data.output_text || '';
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    return res.end();
  }

  const pathname = decodeURIComponent((req.url || '/').split('?')[0]);

  if (req.method === 'POST' && pathname === '/api/powershell') {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', async () => {
      try {
        const body = JSON.parse(raw || '{}');
        const command = String(body.command || '').trim();
        if (!command) {
          return sendJson(res, 400, { error: 'command is required' });
        }
        const output = await runPowerShell(command);
        return sendJson(res, 200, output);
      } catch (error) {
        return sendJson(res, 500, { error: error.message || 'Unexpected error' });
      }
    });
    return;
  }
  if (req.method === 'POST' && pathname === '/api/chat') {
    let raw = '';
    req.on('data', (chunk) => { raw += chunk; });
    req.on('end', async () => {
      try {
        const body = JSON.parse(raw || '{}');
        const apiKey = String(body.apiKey || '').trim();
        const messages = Array.isArray(body.messages) ? body.messages : [];

        if (!apiKey) {
          return sendJson(res, 400, { error: 'apiKey is required' });
        }

        if (!messages.length) {
          return sendJson(res, 400, { error: 'messages are required' });
        }

        const output = await chatWithOpenAI({ apiKey, messages });
        return sendJson(res, 200, { output });
      } catch (error) {
        return sendJson(res, 500, { error: error.message || 'Unexpected error' });
      }
    });
    return;
  }

  serveStatic(req, res);
});

server.listen(PORT, () => {
  console.log(`NanoChat running on http://localhost:${PORT}`);
});

