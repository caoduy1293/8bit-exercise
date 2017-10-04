var express = require('express');
var app = express();
var http = require('http');
var path = require('path');
var route = express.Router();

app.use('/', express.static(path.join(__dirname, 'public')));
route.get('', function(req, res) {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
