### 相关语法

```require```模块，Node 使用 CommonJS 模块系统。使用 require() 时，核心模块总是优先加载。例如，require(‘http’) 总是返回内置的 HTTP 模块，即使该名称的文件存在。 

```createServer```该函数用来创建一个HTTP服务器，并将 requestListener 作为 request 事件的监听函数。
语法：
代码如下:
```http.createServer([requestListener])```
由于该方法属于http模块，使用前需要引入http模块```（var http= require(“http”) ）```
接收参数：
```requestListener ```  请求处理函数，自动添加到 request 事件，函数传递两个参数：

```req```  请求对象，想知道req有哪些属性，可以查看 “http.request 属性整合”。

```res```   响应对象 ，收到请求后要做出的响应。想知道res有哪些属性，可以查看 “http.response属性整合”。
例子：
例子中res指定了响应头，响应体内容为node.js，用end结束。
最后调用listen函数，监听3000端口。
```
var http = require('http');
http.createServer(function(req, res){
 res.writeHead(200, {'Content-type' : 'text/html'});
 res.write('<h1>Node.js</h1>');
 res.end('<p>Hello World</p>');
}).listen(3000);
```
### 代码

```
var http = require('http')
var url = require('url')
var path = require('path')
var fs = require('fs')
function staticRoot(staticPath,req,res) {

  //查看staticpath的值  为 /Users/fanmu/Desktop/node-server1/sample
  console.log(staticPath)

  //值为 /test.html
  console.log(req.url)
  var pathObj = url.parse(req.url,true)

  //值为 对象
  console.log(pathObj)

  //对端口后面路由的值进行判断，如果没有输入则跳转到默认位置 如果直接输入/css则直接查看a.css文件，输入/js则查看b.js文件
if(pathObj.pathname==="/") {
   pathObj.pathname += 'test.html'
   console.log(rel.url)
}else if(pathObj.pathname==="/css"){
  pathObj.pathname += '/a.css'
}else if(pathObj.pathname==="/js"){
  pathObj.pathname += '/b.css'
}

//设置变量获取默认页面的链接地址
var filePath = path.join(staticPath, pathObj.pathname)
console.log(filePath)
fs.readFile(filePath, 'binary', function(err, fileContent){
    
    对输入的路由进行判断，如果没有则返回404 并进行报错，如果有则展示相应的页面
  if(err){
    console.log('404')
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.writeHead(404, 'not found')
    res.end('<h1>404 没有找到test文件</h1>')
  }else{
    console.log('ok')
    res.writeHead(200, 'OK')
    res.write(fileContent, 'binary')
    res.end()      
  }
})
}
//开启静态服务器 端口为8080
var server = http.createServer(function(req,res) {
  staticRoot(path.join(__dirname,'sample'),req,res)
})
server.listen(8080)
```