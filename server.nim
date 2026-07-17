import std/[asynchttpserver, asyncdispatch, os, strutils, mimetypes]

const ServerPort = 8585

proc main() {.async.} =
  var server = newAsyncHttpServer()
  var mimes = newMimetypes()
  
  # Register core mime types
  mimes.register("html", "text/html; charset=utf-8")
  mimes.register("css", "text/css")
  mimes.register("js", "text/javascript")
  mimes.register("json", "application/json")
  mimes.register("db", "application/vnd.sqlite3")
  mimes.register("png", "image/png")
  mimes.register("jpg", "image/jpeg")
  mimes.register("gif", "image/gif")
  mimes.register("svg", "image/svg+xml")
  mimes.register("ico", "image/x-icon")
  mimes.register("md", "text/markdown")

  proc cb(req: Request) {.async, gcsafe.} =
    var reqPath = req.url.path
    if reqPath == "/":
      reqPath = "/index.html"
    
    # Path traversal protection
    if reqPath.contains(".."):
      await req.respond(Http403, "403 Forbidden")
      return

    # Serve the file
    let filePath = getCurrentDir() / reqPath
    if fileExists(filePath):
      let ext = splitFile(filePath).ext.strip(chars = {'.'})
      let contentType = mimes.getMimetype(ext, "application/octet-stream")
      try:
        let content = readFile(filePath)
        var headers = newHttpHeaders([("Content-Type", contentType)])
        await req.respond(Http200, content, headers)
      except CatchableError as e:
        await req.respond(Http500, "500 Internal Server Error: " & e.msg)
    else:
      # Try appending .html (clean URLs fallback)
      let htmlPath = filePath & ".html"
      if fileExists(htmlPath):
        try:
          let content = readFile(htmlPath)
          var headers = newHttpHeaders([("Content-Type", "text/html; charset=utf-8")])
          await req.respond(Http200, content, headers)
        except CatchableError as e:
          await req.respond(Http500, "500 Internal Server Error: " & e.msg)
      else:
        await req.respond(Http404, "<h1>404 Not Found</h1><p>The page " & reqPath & " does not exist.</p>", newHttpHeaders([("Content-Type", "text/html; charset=utf-8")]))

  echo "🚀 Nim High-Performance Static Server running at http://localhost:", ServerPort
  server.listen(Port(ServerPort))
  while true:
    if server.shouldAcceptRequest():
      await server.acceptRequest(cb)
    else:
      await sleepAsync(1)

waitFor main()
