/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var serverStorage = {
  '/classes/messages': [],
  '/send': []
};

fs.readFile('../client/client/index.html', function(err, html) {
  if (err) {
    throw err;
  } 
  var html = html;
});

var init = true;

module.exports = function(request, response) {
  var method = request.method;
  var url = request.url;
  var body = [];
  var headers = defaultCorsHeaders;
  var statusCode;
  headers['Content-Type'] = 'application/json';

  var filePath = url;
  console.log(filePath);

  if (init) {
    response.writeHeader(200, {'Content-Type': 'text/html'});
    response.write(html);
    init = false;
    response.end('ended start');
  } else {

  if (request.method === 'POST') {
    var res = [];

    request.on('data', function(data) {
      // console.log(JSON.parse(data));
      res.push(data); 
      console.log(res);
    });

    request.on('end', function() {
      statusCode = 201;

      var obj = JSON.parse(res);
      obj.objectId = Math.floor(Math.random() * 1000000);

      if (url === '/classes/messages') {
        serverStorage['/classes/messages'].push(obj);
      } else if (url === '/send') {
        serverStorage['/send'].push(obj);
      } else {
        statusCode = 404;
      }

      response.writeHead(statusCode, headers);

      var responseBody = {
        method: method,
        url: url,
        results: obj
        // serverStorage['/classes/messages'].filter(function(obj) {
        //   return (obj.username === res.username);
        // })
      };


      if (response.write) {
        response.write(JSON.stringify(responseBody));
        response.end();
      } else {
        response.end(JSON.stringify(responseBody));                          
      }
    });
  } else {
  // Request and Response access-control-allow-methods from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code.
  // console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
    statusCode = 200;

    // See the note below about CORS headers.
    

    // Tell the client we are sending them plain text.
    //
    // You will need to change this if you are sending something
    // other than plain text, like JSON or HTML.
   

    // .writeHead() writes to the request line and headers of the response,
    // which includes the status and all headers.
    request.on('error', function(err) {
      statusCode = 404;
      console.log(err);
    });

    request.on('data', function(chunk) {
      body.push(chunk);
    });

    request.on('end', function() {
      //body = Buffer.concat(body).toString();
      var results;

      if (url === '/classes/messages') {
        results = serverStorage['/classes/messages'];
      } else if (url === '/send') {
        results = serverStorage['/send'];
      } else {
        statusCode = 404;
      }

      if (response.on) {
        response.on('error', function(err) {
        // console.log(err);
        });
      }

      response.writeHead(statusCode, headers);

      if (body.username) {
        results.filter(function(obj) {
          return obj.username === body.username;
        });
      } 

      var responseBody = {
        method: method,
        url: url,
        results: results
      };

      console.log(response.write);

      if (response.write) {
        response.write(JSON.stringify(responseBody));
        response.end();
      } else {
        response.end(JSON.stringify(responseBody));                          
      }
    });
                                                                                                                                                                                                                           

  /*
  if (first parse piece === 'classes') {
    if (second parse piece === 'messages') {
      serverStorage['messages'].push(data);
    }
  } else {
  if (first parse piece === 'send') {
    serverStorage['send'].push(data);
  }
  }
  */




  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  }
  // console.log(request.url);
}
  // console.log(method);
};


// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};


