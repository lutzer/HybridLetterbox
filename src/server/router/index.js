var express = require('express');
var bodyParser = require('body-parser');

/* Configure express */

var options = {
    root: __dirname,
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
	}
};


module.exports = function (app) {

	// serve static content from public directory
    if (Config.servePublicDir)
	   app.use(Config.baseUrl,express.static('public',options));

    app.use(Config.baseUrl+'api/submissions', bodyParser.json());
    app.use(Config.baseUrl+'api/submissions', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/submissions', require('./submissions'));
};