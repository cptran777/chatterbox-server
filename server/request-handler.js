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
var statusCode;

var serverStorage = {
  '/classes/messages': [{username: 'User', text: 'hey', roomname: 'lobby', objectId: 0},
  {username: 'User', text: 'welcome', roomname: 'lobby', objectId: 1}],
  '/send': []
};


exports.get = function(req, res) {

  statusCode = 200;

  var resBody = {
    method: req.method,
    url: req.originalUrl,
    results: serverStorage['/classes/messages']
  };

  res.json(resBody);
  res.end();
};

exports.post = function(req, res) {

  statusCode = 201;

  var toAdd = req.body;
  toAdd.objectId = Math.floor(Math.random() * 1000000);

  serverStorage['/classes/messages'].push(req.body);

  var resBody = {
    method: req.method,
    url: req.originalUrl,
    results: serverStorage['/classes/messages']
  };

  res.json(resBody);
  res.end();
};

exports.init = function(req, res) {


};
