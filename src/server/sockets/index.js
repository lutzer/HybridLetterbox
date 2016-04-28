var socketio = require('socket.io');
var submissions = r_require('/models/submissions');

var appEvents = r_require('/utils/appEvents');

module.exports = function (http) {

	var io = socketio(http);

	io.on('connection', function(socket){

	    console.log('Socket: Client connected');

	    // Server event handlers
	    function submissionAddedHandler(model) {
		    socket.emit('submission:new',{model: model}); // this will send a signal to the interface and central webserver
	    }
		appEvents.on('submission:new', submissionAddedHandler);

		function submissionRemovedHandler(id) {
			socket.emit('submission:removed',{id: id});
		}
		appEvents.on('submission:removed', submissionRemovedHandler);

		function feedbackScanningHandler(progress) {
			socket.emit('feedback:scanning',{progress: progress});
		}
		appEvents.on('feedback:scanning', feedbackScanningHandler);

		socket.on('error', function(err) {
	    	console.log(err);
		});

	    // Clean up after disconnect
	    socket.on('disconnect', function(){
	        console.log('Socket: Client disconnected');

	        //remove server events
	        appEvents.removeListener('submission:new',submissionAddedHandler);
	        appEvents.removeListener('submission:removed',submissionRemovedHandler);
	        appEvents.removeListener('feedback:scanning',feedbackScanningHandler);
	    });

	});

};