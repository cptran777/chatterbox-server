/* Import node's http module: */
var handleRequest = require('./request-handler');
var $ = require('../node_modules/jquery');

var http = require('http');
var fs = require('fs');
var path = require('path');

var filePath = url;
console.log(filePath);
if (filePath === '/') {
  filePath = '/index.html';
}

filePath = __dirname + filePath;
var extname = path.extname(filePath);
var contentTpe = 'text/html';

switch (extname) {
case '.js':
  contentType = 'text/javascript';
  break;
case '.css':
  contentType = 'text/css';
  break;
}


// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = '127.0.0.1';

// exports.serverStorage = {
//   '/classes/messages': [],
//   '/send': []
// };

fs.readFile('../client/client/index.html', function (err, html) {
  if (err) {
    throw err; 
  }       
  http.createServer(function(request, response) {  
    response.writeHeader(200, {"Content-Type": "text/html"});  
    response.write(html);  
    response.end();  
  }).listen(3000);
});
// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
// var server = http.createServer(handleRequest);
console.log('Listening on http://' + ip + ':' + port);
// server.listen(port, ip);

// To start this server, run:
//
//   node basic-server.js
//
// on the command line.
//
// To connect to the server, load http://127.0.0.1:3000 in your web
// browser.
//
// server.listen() will continue running as long as there is the
// possibility of serving more requests. To stop your server, hit
// Ctrl-C on the command line.


