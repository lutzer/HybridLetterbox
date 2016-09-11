/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-09-08 13:40:07
* @Last Modified by:   lutzer
* @Last Modified time: 2016-09-10 20:24:46
*/

'use strict';

module.exports = {

	initialize: function() {

		/* use absolute paths for require */
		global.r_require = function(name) {
		    return require(__dirname + name);
		}

		/* register config as global var */
		global.Config = r_require('/config.js');

		/* alias for printing */
		global.print = function(string,namespace) {
			var namespace = (typeof namespace !== 'undefined') ?  namespace : 'INFO';
			console.log(namespace+':'+string);
		}

		/* Dependencies */
		var express = require('express');
		var app = express();
		var http = require('http').Server(app);
		var exphbs = require('express-handlebars');

		/* Setup Template Engine */

		app.engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}));
		app.set('view engine', '.hbs');

		/* Router */

		var router = r_require('/router.js')(app);

		/* Run the server */

		http.listen(Config.port,Config.hostname,function(){
		    print("Node Server listening on "+Config.hostname+":"+Config.port);
		});

	}
}

