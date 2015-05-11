'use strict';

var express = require('express');

var app = express();
var quoteRoute = express.Router();

require('./routes/quote_routes')(quoteRoute);

app.use('/api', quoteRoute);

app.listen(process.env.PORT || 3000, function(port) {
	console.log('server is running now at ' + (process.env.PORT || 3000));
});