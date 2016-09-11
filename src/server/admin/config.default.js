/* CONFIG FILE */

var Config = {

	/* SERVER CONFIG */
	baseUrl : '/', // with trailing /
	publicDir : 'public',
	hostname : false, // 127.0.0.1 = private, false = public
	port : '9000',

	/* INI FILES */
	fileName : '../../letterbox/letterbox.ini',
	defaultFileName: '../../letterbox/letterbox.default.ini',

	/* AUTH DATA */
	authName: 'admin',
	authPassword: 'password',

	sudoPassword: 'password'

};

module.exports = Config;