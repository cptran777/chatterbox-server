/*************************************************************

You should implement your req handler function in this file.

reqHandler is already getting passed to http.createServer()
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
  '/classes/messages': [{username: 'joco', text: 'hey', roomname: 'lobby', objectId: 'fack'},
  {username: 'cojo', text: 'sup yay', roomname: 'lobby', objectId: 'you'}],
  '/send': []
};


exports.get = function(req, res) {
  var method = req.method;
  var body = [];
  var headers = defaultCorsHeaders;
  var statusCode;

  statusCode = 200;

  // req.on('error', function(err) {
  //   statusCode = 404;
  //   console.log(err);
  // });

  res.set(headers);

  var resBody = {
    method: method,
    url: req.originalUrl,
    results: serverStorage['/classes/messages']
  };

  console.log(req.body);
  res.json(resBody);
  res.end();
};

exports.post = function(req, res) {
  var method = req.method;
  var body = [];
  var headers = defaultCorsHeaders;
  var statusCode;

  statusCode = 201;

  res.set(headers);

  var toAdd = req.body;
  toAdd.objectId = Math.floor(Math.random() * 1000000);

  serverStorage['/classes/messages'].push(req.body);

  var resBody = {
    method: method,
    url: req.originalUrl,
    results: serverStorage['/classes/messages']
  };

  console.log(req.body);
  res.json(resBody);
  res.end();

};

                                                                                                                                                                                                                           

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




  // Make sure to always call res.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // res.end() will be the body of the res - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the res's internal buffer, forcing
  // node to actually send all the data over to the client.

  // console.log(req.url);
  // console.log(method);



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
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};


