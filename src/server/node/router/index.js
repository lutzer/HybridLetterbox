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

    var handleDbConnection = function(req, res, next) {
        var db = r_require('/database/database')
        print('before');
        db.connect();

        // action after response
        var afterResponse = function() {
            db.disconnect();
        }

        res.on('finish', afterResponse);
        res.on('close', afterResponse);

        next();
    };

	// serve static content
    if (Config.publicDir)
	   app.use(Config.baseUrl,express.static(Config.publicDir,options));

    app.use(handleDbConnection);

    app.use(Config.baseUrl+'api/submissions', bodyParser.json());
    app.use(Config.baseUrl+'api/submissions', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/submissions', require('./submissions'));

    app.use(Config.baseUrl+'api/comments', bodyParser.json());
    app.use(Config.baseUrl+'api/comments', bodyParser.urlencoded({ extended: true }));
    app.use(Config.baseUrl+'api/comments', require('./comments'));

    app.use(Config.baseUrl+'api/feedback', require('./feedback'));
};