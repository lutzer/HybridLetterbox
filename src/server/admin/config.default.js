/* CONFIG FILE */

var Config = {

	/* SERVER CONFIG */
	baseUrl : '/', // with trailing /
	publicDir : 'public',
	hostname : false, // 127.0.0.1 = private, false = public
	port : '8081',

	/* INI FILES */
	fileName : 'data/test.ini',
	defaultFileName: 'data/default.ini',

	/* AUTH DATA */
	authName: 'admin',
	authPassword: 'password',

	sudoPassword: 'password'

};

module.exports = Config;