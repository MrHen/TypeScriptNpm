require('source-map-support').install();
import express = require('express');

// Setup server
var app = express();

var server = require('http').createServer(app);

import widget = require('hen-widget');

// Start server
server.listen(4000, null, function () {
    console.log('Express server listening.', widget.fiddle(1));
});

// Expose app
module.exports = app;
