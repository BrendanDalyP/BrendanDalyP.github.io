// Minimal zero-dependency static file server for the portfolio site.
// Serves the HTML/CSS/JS/image/PDF assets in this folder over plain HTTP.
const http = require('http');
const fs = require('fs');
const path = require('path');

// Listen on all network interfaces (0.0.0.0) so the Replit/container host can reach it.
const PORT = 5000;
const HOST = '0.0.0.0';

// Maps file extensions to the Content-Type header the browser needs to render each asset correctly.
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  // Turn the request URL into a local file path: strip any query string, decode %20 etc.,
  // and resolve it relative to the current working directory.
  let filePath = '.' + decodeURIComponent(req.url.split('?')[0]);
  // Requests for the site root serve the homepage.
  if (filePath === './') filePath = './index.html';

  // Pick the Content-Type from the extension, falling back to a generic binary type.
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Read the file from disk and stream it back, translating filesystem errors into HTTP status codes.
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // File doesn't exist -> 404.
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>');
      } else {
        // Any other read failure (permissions, etc.) -> 500.
        res.writeHead(500);
        res.end('Server Error');
      }
    } else {
      // Success: send the file. 'no-cache' keeps the browser from serving stale assets during development.
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
      });
      res.end(content);
    }
  });
});

// Start accepting connections and log the local URL once the server is ready.
server.listen(PORT, HOST, () => {
  console.log(`Static server running at http://${HOST}:${PORT}`);
});
