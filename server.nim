import std/[asynchttpserver, asyncdispatch, os, strutils, mimetypes, json]

const PortNum = 8000
var server = newAsyncHttpServer()

# --- DYNAMIC SEARCH INDEX BUILDER (Zero-dependency HTML Parser) ---

proc extractTagContent(html, startTag, endTag: string): string =
  let startIdx = html.find(startTag)
  if startIdx == -1: return ""
  let valStart = startIdx + startTag.len
  let endIdx = html.find(endTag, valStart)
  if endIdx == -1: return ""
  return html[valStart ..< endIdx].strip()

proc extractMetaKeywords(html: string): seq[string] =
  let idx = html.find("name=\"keywords\"")
  if idx == -1: return @[]
  let contentIdx = html.find("content=\"", idx)
  if contentIdx == -1: return @[]
  let valStart = contentIdx + 9
  let valEnd = html.find("\"", valStart)
  if valEnd == -1: return @[]
  let keywordsStr = html[valStart ..< valEnd]
  for k in keywordsStr.split(','):
    let trimmed = k.strip()
    if trimmed != "":
      result.add(trimmed)

proc stripHtml(html: string): string =
  var inTag = false
  result = ""
  for c in html:
    if c == '<': inTag = true
    elif c == '>': inTag = false
    elif not inTag:
      result.add(c)
  # Collapse multiple whitespaces/tabs/newlines
  var cleaned = ""
  var lastWasSpace = false
  for c in result:
    if c in {' ', '\t', '\n', '\r'}:
      if not lastWasSpace:
        cleaned.add(' ')
        lastWasSpace = true
    else:
      cleaned.add(c)
      lastWasSpace = false
  return cleaned.strip()

proc buildSearchIndex() =
  echo "🔍 Indexing CuriousWiki pages dynamically..."
  var docs = newJArray()
  
  # Scan index.html and all pages/ files recursively
  var files: seq[string] = @["index.html"]
  if dirExists("pages"):
    for file in walkDirRec("pages"):
      if file.endsWith(".html"):
        files.add(file)
      
  for f in files:
    if fileExists(f):
      try:
        let content = readFile(f)
        
        # Extract title
        let rawTitle = extractTagContent(content, "<title>", "</title>")
        let cleanTitle = if rawTitle.contains("|"): rawTitle.split('|')[0].strip() else: rawTitle.strip()
        
        # Extract tags
        let keywords = extractMetaKeywords(content)
        var keywordsArr = newJArray()
        for k in keywords:
          keywordsArr.add(newJString(k))
          
        # Extract snippet (first paragraph content)
        let pContent = extractTagContent(content, "<p>", "</p>")
        let cleanSnippet = stripHtml(pContent)
        
        # Extract full content for dense searching (inside article-body section)
        let bodyStartMarker = "<section class=\"article-body\">"
        let bodyStart = content.find(bodyStartMarker)
        var bodyHtml = ""
        if bodyStart != -1:
          let bodyEnd = content.find("</section>", bodyStart)
          if bodyEnd != -1:
            bodyHtml = content[(bodyStart + bodyStartMarker.len) ..< bodyEnd]
        if bodyHtml == "":
          bodyHtml = content
        let cleanText = stripHtml(bodyHtml)
        
        var doc = newJObject()
        doc["title"] = newJString(cleanTitle)
        doc["path"] = newJString(f)
        doc["tags"] = keywordsArr
        doc["snippet"] = newJString(cleanSnippet)
        doc["content"] = newJString(cleanText)
        
        docs.add(doc)
      except:
        echo "⚠️ Failed to index file: ", f
        
  writeFile("search-index.json", $docs)
  echo "✅ Dynamic search-index.json successfully generated (", docs.len, " files indexed)"

# --- END SEARCH INDEX BUILDER ---


proc cb(req: Request) {.async, gcsafe.} =
  var m = newMimetypes()
  m.register("html", "text/html; charset=utf-8")
  m.register("css", "text/css")
  m.register("js", "text/javascript")
  m.register("json", "application/json")
  m.register("png", "image/png")
  m.register("jpg", "image/jpeg")
  m.register("svg", "image/svg+xml")
  m.register("ico", "image/x-icon")
  m.register("md", "text/markdown")

  var path = req.url.path
  
  # Map root directory requests to index.html
  if path == "/" or path.endsWith("/"):
    path = path & "index.html"
    
  # Strip leading slash to get a local filepath
  let localPath = "." & path
  
  if fileExists(localPath):
    let ext = splitFile(localPath).ext.strip(chars = {'.'})
    let contentType = m.getMimetype(ext, "application/octet-stream")
    try:
      let content = readFile(localPath)
      let headers = newHttpHeaders([
        ("Content-Type", contentType),
        ("Cache-Control", "no-cache") # Disable cache during development
      ])
      await req.respond(Http200, content, headers)
    except:
      await req.respond(Http500, "500 Internal Server Error")
  else:
    # 404 handler
    let errorHeaders = newHttpHeaders([("Content-Type", "text/html; charset=utf-8")])
    let errorPage = "<h1>404 Not Found</h1><p>The requested file <code>" & path & "</code> could not be found.</p>"
    await req.respond(Http404, errorPage, errorHeaders)

# Generate index on startup
buildSearchIndex()

echo "🚀 Nim static server running at http://localhost:", PortNum
waitFor server.serve(Port(PortNum), cb)
