#!/bin/bash

# Port to host the wiki
PORT=8585

# Step 1: Re-compile markdown pages and rebuild the sharded prefix search index
if command -v nim &>/dev/null && [ -f "build.nim" ]; then
    echo "⚙️ Running build.nim to compile markdown and rebuild prefix search index..."
    nim c -r --verbosity:0 build.nim
else
    echo "⚠️ Warning: nim compiler or build.nim not found. Skipping build step."
fi

echo "Checking for the most lightweight static server option..."

# Option 0: High-Performance Compiled Nim Server (Ultra-lightweight binary)
if command -v nim &>/dev/null && [ -f "server.nim" ]; then
    echo "⚙️ Compiling server.nim for production release..."
    nim c -d:release --verbosity:0 server.nim
    if [ -f "./server" ]; then
        echo "🚀 Launching Nim high-performance server..."
        ./server
        exit 0
    fi
fi

# Option 1: Python 3 (built-in interpreter, fallback)
if command -v python3 &>/dev/null; then
    echo "🚀 Launching Python http.server on port $PORT (Zero-dependency static server)..."
    python3 -m http.server $PORT
    exit 0
fi

# Option 2: pnpm (uses pnpm dlx to run http-server without local node_modules)
if command -v pnpm &>/dev/null; then
    echo "🚀 Launching pnpm dlx http-server on port $PORT..."
    pnpm dlx http-server -p $PORT
    exit 0
fi

# Option 3: Node.js Built-in Server (zero npm/pnpm installation required)
if command -v node &>/dev/null; then
    echo "🚀 Launching pure Node.js built-in static server on port $PORT..."
    node -e "
    const http = require('http');
    const fs = require('fs');
    const path = require('path');
    const PORT = $PORT;
    
    http.createServer((req, res) => {
        let filePath = '.' + req.url;
        if (filePath === './') {
            filePath = './index.html';
        } else if (filePath.includes('pages/') && !path.extname(filePath)) {
            filePath += '.html';
        }
        
        const extname = String(path.extname(filePath)).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html; charset=utf-8',
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.ico': 'image/x-icon',
            '.md': 'text/markdown'
        };
        
        const contentType = mimeTypes[extname] || 'application/octet-stream';
        
        fs.readFile(filePath, (error, content) => {
            if (error) {
                if (error.code == 'ENOENT') {
                    if (!filePath.endsWith('.html')) {
                        fs.readFile(filePath + '.html', (err, htmlContent) => {
                            if (err) {
                                res.writeHead(404, { 'Content-Type': 'text/html' });
                                res.end('<h1>404 Not Found</h1><p>The page ' + filePath + ' does not exist.</p>');
                            } else {
                                res.writeHead(200, { 'Content-Type': 'text/html' });
                                res.end(htmlContent, 'utf-8');
                            }
                        });
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1><p>The page ' + filePath + ' does not exist.</p>');
                    }
                } else {
                    res.writeHead(500);
                    res.end('Server error: ' + error.code);
                }
            } else {
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');
            }
        });
    }).listen(PORT);
    
    console.log('Server is running at http://localhost:' + PORT);
    "
    exit 0
fi

echo "❌ Error: Neither python3, pnpm, nor node was found to serve static files."
exit 1
