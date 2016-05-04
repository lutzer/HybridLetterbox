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

	// serve static content
    if (Config.publicDir)
	   app.use(Config.baseUrl,express.static(Config.publicDir,options));

    app.use(Config.baseUrl+'api/submissions', bodyParser.json());
    app.use(Config.baseUrl+'api/submissions', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/submissions', require('./submissions'));

    app.use(Config.baseUrl+'api/comments', bodyParser.json());
    app.use(Config.baseUrl+'api/comments', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/comments', require('./comments'));

    app.use(Config.baseUrl+'api/feedback', require('./feedback'));
};