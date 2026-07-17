const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const matter = require('gray-matter');
const readline = require('readline/promises');

const CONTENT_DIR = path.join(__dirname, 'content');
const PAGES_DIR = path.join(__dirname, 'pages');
const TEMPLATE_FILE = path.join(PAGES_DIR, 'template.html');
const SEARCH_INDEX_FILE = path.join(__dirname, 'search-index.json');

// Ensure content directory exists
if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR);
    // Create a dummy markdown file to start with
    fs.writeFileSync(
        path.join(CONTENT_DIR, 'hello-world.md'),
        `---
title: Hello World
tags: welcome, demo
date: ${new Date().toISOString().split('T')[0]}
---
# Welcome to CuriousWiki!

This is a dynamically compiled page from a Markdown file. 

## Features
- Edit directly in Markdown.
- Automatic HTML conversion at build time.
- MiniSearch search index regenerated automatically.`
    );
}

// Read template
if (!fs.existsSync(TEMPLATE_FILE)) {
    console.error(`Error: Template file not found at ${TEMPLATE_FILE}`);
    process.exit(1);
}
const templateHtml = fs.readFileSync(TEMPLATE_FILE, 'utf-8');

function getRelativePrefix(depth) {
    return '../'.repeat(depth + 1);
}

function getBreadcrumbs(relativeSubDir, title) {
    const parts = relativeSubDir ? relativeSubDir.split(path.sep).filter(p => p) : [];
    let breadcrumbHtml = `<a href="${getRelativePrefix(parts.length)}index.html">Home</a>`;
    
    parts.forEach((part) => {
        const displayPart = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
        breadcrumbHtml += `\n                    <span class="separator">></span>\n                    <span>${displayPart}</span>`;
    });
    
    breadcrumbHtml += `\n                    <span class="separator">></span>\n                    <span>${title}</span>`;
    return breadcrumbHtml;
}

function cleanHtmlTags(html) {
    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function getAllFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            results = results.concat(getAllFiles(dirPath));
        } else {
            results.push(dirPath);
        }
    });
    return results;
}

function getSubDirectories(dir, baseDir = dir) {
    let dirs = [];
    if (!fs.existsSync(dir)) return dirs;
    fs.readdirSync(dir).forEach(f => {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            const relPath = path.relative(baseDir, fullPath);
            dirs.push(relPath);
            dirs = dirs.concat(getSubDirectories(fullPath, baseDir));
        }
    });
    return dirs;
}

const searchDocuments = [];

async function build() {
    console.log("⚙️ Compiling Markdown files into HTML...");
    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const files = getAllFiles(CONTENT_DIR);

    for (let i = 0; i < files.length; i++) {
        let filePath = files[i];
        if (!filePath.endsWith('.md')) continue;

        let relativePath = path.relative(CONTENT_DIR, filePath);
        let relativeSubDir = path.dirname(relativePath) === '.' ? '' : path.dirname(relativePath);
        
        // If the file is in the root of CONTENT_DIR, ask where it should go
        if (!relativeSubDir && process.stdout.isTTY) {
            console.log(`\n📂 File found in content root: "${path.basename(filePath)}"`);
            
            const subdirs = ['pages/ (root)'].concat(getSubDirectories(PAGES_DIR).map(d => `pages/${d}`));
            console.log("Where should this page be placed to keep the wiki organized?");
            subdirs.forEach((dir, idx) => {
                console.log(`  [${idx}] ${dir}`);
            });
            console.log(`  [${subdirs.length}] -- Create a new folder --`);
            
            let choice = -1;
            while (true) {
                const answer = await rl.question(`Select folder [0-${subdirs.length}] (default 0): `);
                const num = answer.trim() === '' ? 0 : parseInt(answer.trim(), 10);
                if (!isNaN(num) && num >= 0 && num <= subdirs.length) {
                    choice = num;
                    break;
                }
                console.log("Invalid option. Please try again.");
            }

            let targetSubDir = '';
            if (choice === subdirs.length) {
                // Create new directory
                const newDirInput = await rl.question("Enter the path for the new folder (e.g. 'linux/kernel' or 'productivity/habits'): ");
                targetSubDir = newDirInput.trim().replace(/^\/+|\/+$/g, ''); // clean leading/trailing slashes
                if (targetSubDir) {
                    fs.mkdirSync(path.join(CONTENT_DIR, targetSubDir), { recursive: true });
                    fs.mkdirSync(path.join(PAGES_DIR, targetSubDir), { recursive: true });
                }
            } else if (choice > 0) {
                // Extract relative path from subdirs selection (removing 'pages/')
                targetSubDir = subdirs[choice].replace(/^pages\//, '');
            }

            if (targetSubDir) {
                const newFilePath = path.join(CONTENT_DIR, targetSubDir, path.basename(filePath));
                console.log(`Moving "${path.basename(filePath)}" to organized location: content/${targetSubDir}/`);
                fs.renameSync(filePath, newFilePath);
                filePath = newFilePath;
                relativePath = path.relative(CONTENT_DIR, filePath);
                relativeSubDir = path.dirname(relativePath);
            }
        }

        const depth = relativeSubDir ? relativeSubDir.split(path.sep).filter(p => p).length : 0;
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { data: frontmatter, content: markdownBody } = matter(fileContent);
        
        const title = frontmatter.title || path.basename(filePath, '.md').replace(/-/g, ' ');
        const tags = frontmatter.tags ? (Array.isArray(frontmatter.tags) ? frontmatter.tags : frontmatter.tags.split(',').map(t => t.trim())) : [];
        const fileStats = fs.statSync(filePath);
        const dateObj = frontmatter.date ? new Date(frontmatter.date) : (fileStats.birthtime || fileStats.mtime || new Date());
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const dateStr = dateObj.toLocaleDateString('en-US', options);

        // Calculate Reading Time (Average 200 words per minute)
        const wordsCount = markdownBody.trim().split(/\s+/).filter(w => w.length > 0).length;
        const readingTimeMin = Math.max(1, Math.round(wordsCount / 200));
        const readingTimeStr = `${readingTimeMin} min read`;
        
        const htmlBody = marked.parse(markdownBody);
        
        // Calculate prefixes
        const prefix = getRelativePrefix(depth);
        
        // Replace paths and placeholder values in template
        let pageHtml = templateHtml;
        
        // Adjust relative links in template
        pageHtml = pageHtml.replace(/href="\.\.\/css\//g, `href="${prefix}css/`);
        pageHtml = pageHtml.replace(/src="\.\.\/js\//g, `src="${prefix}js/`);
        pageHtml = pageHtml.replace(/href="\.\.\/index\.html"/g, `href="${prefix}index.html"`);
        
        // Replace metadata
        pageHtml = pageHtml.replace(/<title>.*?<\/title>/, `<title>${title} | CuriousWiki</title>`);
        pageHtml = pageHtml.replace(/<meta name="keywords" content=".*?">/, `<meta name="keywords" content="${tags.join(', ')}">`);
        
        // Replace breadcrumbs
        const breadcrumbsHtml = getBreadcrumbs(relativeSubDir, title);
        pageHtml = pageHtml.replace(/<div class="breadcrumbs">[\s\S]*?<\/div>/, `<div class="breadcrumbs">\n                    ${breadcrumbsHtml}\n                </div>`);
        
        // Replace main content article header
        const articleHeaderHtml = `
                            <h1 class="article-title">${title}</h1>
                            <div class="article-meta">
                                <span><i data-lucide="calendar"></i> ${dateStr}</span>
                                <span><i data-lucide="clock"></i> ${readingTimeStr}</span>
                                <span><i data-lucide="tag"></i> ${tags.join(', ')}</span>
                            </div>
        `;
        pageHtml = pageHtml.replace(/<h1 class="article-title">[\s\S]*?<\/div>/, articleHeaderHtml);
        
        // Replace main body content
        const bodyContentHtml = `<section class="article-body">
                            ${htmlBody}
                        </section>`;
        pageHtml = pageHtml.replace(/<section class="article-body">[\s\S]*?<\/section>/, bodyContentHtml);

        // Save output html
        const outputHtmlPath = path.join(PAGES_DIR, relativePath.replace(/\.md$/, '.html'));
        fs.mkdirSync(path.dirname(outputHtmlPath), { recursive: true });
        fs.writeFileSync(outputHtmlPath, pageHtml, 'utf-8');
        
        console.log(`✅ Compiled: ${relativePath} -> pages/${relativePath.replace(/\.md$/, '.html')}`);
        
        // Extract snippet for search
        const cleanSnippet = markdownBody.split('\n').filter(line => line.trim() && !line.startsWith('#') && !line.startsWith('---')).slice(0, 2).join(' ').substring(0, 160) + '...';
        
        // Add to search index documents
        searchDocuments.push({
            title: title,
            path: `pages/${relativePath.replace(/\.md$/, '.html')}`,
            tags: tags,
            snippet: cleanSnippet,
            content: cleanHtmlTags(htmlBody)
        });
    }

    rl.close();

    // Update index page tags or reference links in search index if index.html exists
    if (fs.existsSync(path.join(__dirname, 'index.html'))) {
        const indexHtmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
        const cleanText = cleanHtmlTags(indexHtmlContent);
        searchDocuments.push({
            title: "CuriousWiki Dashboard",
            path: "index.html",
            tags: ["dashboard", "home", "index"],
            snippet: "Welcome to CuriousWiki, a high-performance static shared knowledge browser.",
            content: cleanText
        });
    }

    // Write the search-index.json
    fs.writeFileSync(SEARCH_INDEX_FILE, JSON.stringify(searchDocuments, null, 2), 'utf-8');
    console.log(`✅ Successfully generated search-index.json with ${searchDocuments.length} pages!`);
}

build().catch(err => {
    console.error("Build failed:", err);
    process.exit(1);
});
