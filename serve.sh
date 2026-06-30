#!/bin/bash

# Port to host the wiki
PORT=8000

echo "Checking for the most lightweight server option..."

# Option 1: Pre-compiled Nim Binary (compiled native binary, near-zero RAM, fastest start)
if [ -f "./server" ]; then
    echo "🚀 Launching compiled Nim server (Native binary, fastest execution, ~2MB RAM)..."
    ./server
    exit 0
fi

# Option 2: Python 3 (built-in interpreter, zero installation)
if command -v python3 &>/dev/null; then
    echo "🚀 Launching Python http.server on port $PORT (Zero-dependency)..."
    python3 -m http.server $PORT
    exit 0
fi

# Option 3: Node.js Built-in Server (zero npm/pnpm installation required)
if command -v node &>/dev/null; then
    echo "🚀 Launching pure Node.js built-in server on port $PORT (Zero npm package installs)..."
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

# Option 4: pnpm (uses pnpm dlx to run http-server without local node_modules)
if command -v pnpm &>/dev/null; then
    echo "🚀 Launching pnpm dlx http-server on port $PORT..."
    pnpm dlx http-server -p $PORT
    exit 0
fi

# Option 5: Build Nim server if source code exists and nim is installed
if command -v nim &>/dev/null && [ -f "server.nim" ]; then
    echo "⚙️ Found server.nim. Compiling it..."
    nim c -d:release server.nim
    if [ -f "./server" ]; then
        echo "🚀 Launching compiled Nim server..."
        ./server
        exit 0
    fi
fi

echo "❌ Error: Neither compiled server, python3, node, pnpm, nor nim was found."
exit 1
