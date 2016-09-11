'use strict';

var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var Utils = r_require('/utils/utils.js');
var exec = require('child_process').exec;

/* Configure express */

module.exports = function (app) {

    var publicOptions = {
        root: __dirname,
        dotfiles: 'deny',
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    /* Error Handling */
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
    });

    /* Render Main page */
	app.get('/', function(req, res) {

		//read file
		fs.readFile(Config.fileName, 'utf8', function (err,data) {
			if (err) Utils.handleError(err);

				res.render('index', {
					text: data
				});
			});
	});

	/* public folder to store assets */
	app.use(Config.baseUrl,express.static(Config.publicDir,publicOptions));

	/* save edited ini file */
	app.use('/save', bodyParser.json());
	app.use('/save', bodyParser.urlencoded({ extended: true }));
	app.post('/save', function(req, res) {

		var text = req.body.text

		//write file
		fs.writeFile(Config.fileName, text, 'utf8', function (err) {
		  if (err) Utils.handleError(err);

		  res.send("File saved.")
		});
	});

	/* reset ini file to default */
	app.get('/reset', function(req, res) {
		fs.readFile(Config.defaultFileName, 'utf8', function (err,data) {
			if (err) Utils.handleError(err);
			fs.writeFile(Config.fileName, data, 'utf8', function (err) {
				if (err) Utils.handleError(err);

				res.send("File reset to default.")
			});
		})
	});


	/* restart letterbox script */
	app.get('/restart', function(req, res) {
		var child = exec("echo "+Config.sudoPassword+" | sudo -S systemctl restart letterbox.service", function (err, stdout, stderr) {
			if (err) Utils.handleError(err);
			console.log(stdout);

			res.send("Letterbox restarted.")
		});
	});

};