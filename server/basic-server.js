/* Import node's http module: */
var handle = require('./request-handler');


var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var port = 3000;

var ip = '127.0.0.1';


app.set(port);

app.use('/static', express.static('public'));

app.use(cors());
app.use(bodyParser.json());

app.get('/', handle.init);

app.get('/classes/messages', handle.get);

app.post('/classes/messages', handle.post);

app.listen(port, ip);

console.log('Listening on http://' + ip + ':' + port);
