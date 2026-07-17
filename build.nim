import std/[os, strutils, times, json, unicode, sets, tables]

const
  ContentDir = "content"
  PagesDir = "pages"
  TemplateFile = PagesDir / "template.html"

# A very simple Markdown to HTML compiler
proc markdownToHtml(md: string): string =
  var html = ""
  var inList = false
  var inCode = false
  var inMath = false
  var lines = md.splitLines()
  
  for rawLine in lines:
    let line = rawLine.strip()
    if line.startsWith("```"):
      if inCode:
        html.add("</code></pre>\n")
        inCode = false
      else:
        let lang = line.substr(3).strip()
        html.add("<pre><code class=\"language-" & (if lang != "": lang else: "text") & "\">\n")
        inCode = true
      continue

    if inCode:
      html.add(rawLine & "\n")
      continue

    if line.startsWith("$$") or line == "$$":
      if inMath:
        html.add("$$\n</div>\n")
        inMath = false
      else:
        html.add("<div class=\"math-block\">$$\n")
        inMath = true
      continue

    if inMath:
      html.add(line & "\n")
      continue

    if line.startsWith("- "):
      if not inList:
        html.add("<ul>\n")
        inList = true
      html.add("  <li>" & line.substr(2).strip() & "</li>\n")
      continue
    else:
      if inList:
        html.add("</ul>\n")
        inList = false

    if line.startsWith("# "):
      html.add("<h1>" & line.substr(2).strip() & "</h1>\n")
    elif line.startsWith("## "):
      html.add("<h2>" & line.substr(3).strip() & "</h2>\n")
    elif line.startsWith("### "):
      html.add("<h3>" & line.substr(4).strip() & "</h3>\n")
    elif line == "":
      discard
    else:
      html.add("<p>" & line & "</p>\n")
      
  if inList:
    html.add("</ul>\n")
  if inCode:
    html.add("</code></pre>\n")
  if inMath:
    html.add("$$\n</div>\n")
    
  return html

proc getRelativePrefix(depth: int): string =
  result = "../".repeat(depth + 1)

proc getBreadcrumbs(relativeSubDir, title: string, depth: int): string =
  let prefix = getRelativePrefix(depth)
  var breadcrumbHtml = "<a href=\"" & prefix & "index.html\">Home</a>"
  if relativeSubDir != "" and relativeSubDir != ".":
    let parts = relativeSubDir.split(DirSep)
    for part in parts:
      if part != "":
        let displayPart = part[0].toUpperAscii() & part[1..^1].replace("-", " ")
        breadcrumbHtml.add("\n                    <span class=\"separator\">&gt;</span>\n                    <span>" & displayPart & "</span>")
  
  breadcrumbHtml.add("\n                    <span class=\"separator\">&gt;</span>\n                    <span>" & title & "</span>")
  return breadcrumbHtml

proc buildPages() =
  if not fileExists(TemplateFile):
    echo "⚠️ Info: Template file not found at " & TemplateFile & ". Skipping custom Nim page compilation (using Hugo instead)."
    return

  echo "⚙️ Compiling Markdown files into HTML using Nim..."
  let templateHtml = readFile(TemplateFile)
  
  for file in walkDirRec(ContentDir):
    if file.endsWith(".md"):
      let relativePath = relativePath(file, ContentDir)
      var relativeSubDir = parentDir(relativePath)
      if relativeSubDir == ".": relativeSubDir = ""
      
      let depth = if relativeSubDir != "": relativeSubDir.split(DirSep).len else: 0
      
      # Read file and parse frontmatter
      let content = readFile(file)
      var title = splitFile(file).name.replace("-", " ")
      var tags: seq[string] = @[]
      var dateStr = now().format("yyyy-MM-dd")
      var mdBody = ""
      
      let parts = content.split("---")
      if parts.len >= 3:
        # Frontmatter exists
        let fm = parts[1]
        mdBody = parts[2 .. parts.high].join("---")
        for line in fm.splitLines():
          let lineTrimmed = line.strip()
          if lineTrimmed.startsWith("title:"):
            title = lineTrimmed.substr("title:".len).strip()
          elif lineTrimmed.startsWith("tags:"):
            let tagList = lineTrimmed.substr("tags:".len).strip()
            for t in tagList.split(','):
              tags.add(t.strip())
          elif lineTrimmed.startsWith("date:"):
            dateStr = lineTrimmed.substr("date:".len).strip()
      else:
        mdBody = content
        
      let htmlBody = markdownToHtml(mdBody)
      let prefix = getRelativePrefix(depth)
      
      var pageHtml = templateHtml
      pageHtml = pageHtml.replace("href=\"../css/", "href=\"" & prefix & "css/")
      pageHtml = pageHtml.replace("src=\"../js/", "src=\"" & prefix & "js/")
      pageHtml = pageHtml.replace("href=\"../index.html\"", "href=\"" & prefix & "index.html\"")
      
      # Replace title
      let titleStart = pageHtml.find("<title>")
      if titleStart != -1:
        let titleEnd = pageHtml.find("</title>", titleStart)
        if titleEnd != -1:
          pageHtml = pageHtml[0 ..< titleStart] & "<title>" & title & " | CuriousWiki</title>" & pageHtml.substr(titleEnd + 8)
          
      # Replace keywords
      let kwStart = pageHtml.find("<meta name=\"keywords\"")
      if kwStart != -1:
        let kwEnd = pageHtml.find(">", kwStart)
        if kwEnd != -1:
          pageHtml = pageHtml[0 ..< kwStart] & "<meta name=\"keywords\" content=\"" & tags.join(", ") & "\">" & pageHtml.substr(kwEnd + 1)
          
      # Replace breadcrumbs
      let breadcrumbsHtml = getBreadcrumbs(relativeSubDir, title, depth)
      let bcStart = pageHtml.find("<div class=\"breadcrumbs\">")
      if bcStart != -1:
        let bcEnd = pageHtml.find("</div>", bcStart)
        if bcEnd != -1:
          pageHtml = pageHtml[0 ..< bcStart] & "<div class=\"breadcrumbs\">\n                    " & breadcrumbsHtml & "\n                </div>" & pageHtml.substr(bcEnd + 6)
          
      # Replace article header
      let readingTimeStr = "1 min read"
      let articleHeaderHtml = "\n                             <h1 class=\"article-title\">" & title & "</h1>\n                            <div class=\"article-meta\">\n                                <span><i data-lucide=\"calendar\"></i> " & dateStr & "</span>\n                                <span><i data-lucide=\"clock\"></i> " & readingTimeStr & "</span>\n                                <span><i data-lucide=\"tag\"></i> " & tags.join(", ") & "</span>\n                            </div>\n        "
      let ahStart = pageHtml.find("<h1 class=\"article-title\">")
      if ahStart != -1:
        let ahEnd = pageHtml.find("</div>", ahStart)
        if ahEnd != -1:
          pageHtml = pageHtml[0 ..< ahStart] & articleHeaderHtml & pageHtml.substr(ahEnd + 6)
          
      # Replace article body
      let bodyStartMarker = "<section class=\"article-body\">"
      let abStart = pageHtml.find(bodyStartMarker)
      if abStart != -1:
        let abEnd = pageHtml.find("</section>", abStart)
        if abEnd != -1:
          pageHtml = pageHtml[0 .. abStart + bodyStartMarker.len - 1] & "\n                            " & htmlBody & "\n                        " & pageHtml.substr(abEnd)
          
      let outputHtmlPath = PagesDir / relativePath.replace(".md", ".html")
      createDir(parentDir(outputHtmlPath))
      writeFile(outputHtmlPath, pageHtml)
      echo "✅ Compiled: " & relativePath & " -> pages/" & relativePath.replace(".md", ".html")

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

proc toHexFilename(s: string): string =
  result = ""
  for c in s:
    result.add(toHex(ord(c), 2).toLowerAscii())

# English and Hindi stop words
const StopWords = toHashSet([
  "the", "a", "an", "is", "of", "and", "in", "to", "for", "on", "with", "at", "by", "from", "this", "that", "these", "those",
  "it", "its", "they", "them", "their", "there", "here", "when", "where", "how", "why", "who", "which", "what", "then", "than",
  "but", "or", "as", "if", "be", "been", "being", "have", "has", "had", "do", "does", "did", "will", "would", "shall", "should",
  "can", "could", "may", "might", "must", "about", "above", "below", "under", "over", "again", "further", "once", "here", "there",
  "की", "का", "के", "में", "से", "को", "पर", "है", "हैं", "और", "भी", "ही", "तो", "ने", "हो", "था", "थे", "थी", "लिए", "कर",
  "करते", "करना", "करने", "दिया", "लिया", "गया", "गए", "गई", "इस", "उस", "यह", "वह", "जो", "तो", "ही", "कि", "या", "और"
])

proc wikiTokenize(text: string): seq[string] =
  let runes = toRunes(text.toLowerAscii())
  var currentWord = ""
  for r in runes:
    let code = r.int
    let isAlphaNum = (code >= 48 and code <= 57) or (code >= 97 and code <= 122)
    let isHindi = (code >= 0x0900 and code <= 0x097F)
    if isAlphaNum or isHindi:
      currentWord.add($r)
    else:
      if currentWord.len > 0:
        if currentWord notin StopWords and currentWord.len >= 2:
          result.add(currentWord)
        currentWord = ""
  if currentWord.len > 0:
    if currentWord notin StopWords and currentWord.len >= 2:
      result.add(currentWord)

proc buildSearchIndex() =
  echo "🔍 Indexing CuriousWiki pages to sharded prefix JSON files from public/..."
  
  # Scan index.html and all pages/ files recursively
  var files: seq[string] = @[]
  if fileExists("public/index.html"):
    files.add("public/index.html")
  if dirExists("public/pages"):
    for file in walkDirRec("public/pages"):
      if file.endsWith(".html") and not file.contains("archwikiknowledge for reference"):
        files.add(file)
        
  var pagesMeta = newSeq[JsonNode]()
  var indexMap = initTable[string, Table[string, seq[int]]]()
  var pageId = 0
  
  for f in files:
    if fileExists(f):
      try:
        let content = readFile(f)
        
        # Extract title
        let rawTitle = extractTagContent(content, "<title>", "</title>")
        let cleanTitle = if rawTitle.contains("|"): rawTitle.split('|')[0].strip() else: rawTitle.strip()
        
        # Extract tags
        let keywords = extractMetaKeywords(content)
          
        # Extract snippet
        var cleanSnippet = stripHtml(extractTagContent(content, "<p>", "</p>"))
        if cleanSnippet == "":
          let bodyText = stripHtml(extractTagContent(content, "<section class=\"article-body\">", "</section>"))
          if bodyText.len > 160:
            cleanSnippet = bodyText[0..157] & "..."
          else:
            cleanSnippet = bodyText
            
        # Create metadata node
        var relativePath = f
        if relativePath.startsWith("public/"):
          relativePath = relativePath.substr(7)
        elif relativePath.startsWith("public\\"):
          relativePath = relativePath.substr(7)

        let pageNode = %* {
          "id": pageId,
          "title": cleanTitle,
          "path": relativePath,
          "tags": keywords,
          "snippet": cleanSnippet
        }
        pagesMeta.add(pageNode)
        
        # Extract body text
        let bodyHtml = extractTagContent(content, "<section class=\"article-body\">", "</section>")
        let bodyText = if bodyHtml != "": stripHtml(bodyHtml) else: stripHtml(content)
        
        # Tokenize and collect words
        var pageWords = initHashSet[string]()
        for w in wikiTokenize(cleanTitle): pageWords.incl(w)
        for w in wikiTokenize(keywords.join(" ")): pageWords.incl(w)
        for w in wikiTokenize(bodyText): pageWords.incl(w)
        
        # Index words
        for w in pageWords:
          let runesW = toRunes(w)
          let prefix = if runesW.len < 2: "short" else: $(runesW[0]) & $(runesW[1])
          if prefix notin indexMap:
            indexMap[prefix] = initTable[string, seq[int]]()
          if w notin indexMap[prefix]:
            indexMap[prefix][w] = @[]
          if pageId notin indexMap[prefix][w]:
            indexMap[prefix][w].add(pageId)
            
        pageId.inc
      except:
        echo "⚠️ Failed to index file: ", f
        
  # Clean up and recreate directories
  removeDir("public/search")
  createDir("public/search")
  createDir("public/search/idx")
  createDir("public/search/meta")
  
  # Write index files
  for prefix, wordsTable in indexMap:
    let jsonWords = newJObject()
    for w, pageIds in wordsTable:
      let jsonPageIds = newJArray()
      for pid in pageIds:
        jsonPageIds.add(newJInt(pid))
      jsonWords[w] = jsonPageIds
      
    let filename = if prefix == "short": "short.json" else: toHexFilename(prefix) & ".json"
    writeFile("public/search/idx" / filename, $jsonWords)
    
  # Write metadata chunks
  const ChunkSize = 100
  let numChunks = (pagesMeta.len + ChunkSize - 1) div ChunkSize
  for chunkIdx in 0 ..< numChunks:
    let startIdx = chunkIdx * ChunkSize
    let endIdx = min(startIdx + ChunkSize - 1, pagesMeta.high)
    let chunkArr = newJArray()
    for idx in startIdx .. endIdx:
      chunkArr.add(pagesMeta[idx])
    writeFile("public/search/meta" / $chunkIdx & ".json", $chunkArr)
    
  # Write config
  let configJson = %* {
    "total_pages": pagesMeta.len,
    "chunk_size": ChunkSize
  }
  writeFile("public/search/config.json", $configJson)
  
  # Clean up old database files
  if fileExists("public/wiki.db"):
    try: removeFile("public/wiki.db")
    except: discard
  if fileExists("public/search-index.json"):
    try: removeFile("public/search-index.json")
    except: discard
    
  echo "✅ Sharded search index built successfully. Total pages: ", pagesMeta.len

when isMainModule:
  buildPages()
  buildSearchIndex()
