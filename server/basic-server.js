/* Import node's http module: */
var handle = require('./request-handler');

exports.server = function() {
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

var port = process.env.PORT || 3000);

app.set(port);

app.use('/static', express.static('public'));

app.use(cors());
app.use(bodyParser.json());

app.get('/', handle.init);

app.get('/classes/messages', handle.get);

app.post('/classes/messages', handle.post);

app.listen(port, 0.0.0.0);

console.log('Listening on http://' + ip + ':' + port);

}();
