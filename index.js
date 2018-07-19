var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')
function staticRoot(staticPath,req,res) {
  var pathObj = url.parse(req.url,true)
  if(pathObj.pathname==="/") {
     pathObj.pathname += 'test.html'
  }else if(pathObj.pathname==="/css"){
     pathObj.pathname += '/a.css'
  }else if(pathObj.pathname==="/js"){
     pathObj.pathname += '/b.css'
  }
var filePath = path.join(staticPath, pathObj.pathname)
fs.readFile(filePath, 'binary', function(err, fileContent){
  if(err){
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.writeHead(404, 'not found')
    res.end('<h1>404 没有找到test文件</h1>')
  }else{
    res.writeHead(200, 'OK')
    res.write(fileContent, 'binary')
    res.end()      
  }
})
}
var server = http.createServer(function(req,res) {
  staticRoot(path.join(__dirname,'sample'),req,res)
})
server.listen(8080)