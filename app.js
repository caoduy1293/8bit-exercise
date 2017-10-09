/**
 * Created by caoquang on 09/10/2017.
 */
var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use('/',express.static(path.join(__dirname, 'public')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;