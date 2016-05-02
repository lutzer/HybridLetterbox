var socketio = require('socket.io');

var appEvents = r_require('/utils/appEvents');

module.exports = function (http) {

	var sio = socketio(http);

	sio.on('connection', function(socket){

	    print('Socket: Client connected');

		socket.on('error', function(err) {
	    	print(err);
		});

	    // Server event handlers
	    
	    /* ALL NAMESPACES */

	    function submissionAddedHandler(model) {
		    sio.emit('submission:new', {model: model}, socket.id); // this will send a signal to the interface and central webserver
	    }
		appEvents.on('submission:new', submissionAddedHandler);

		function submissionRemovedHandler(id) {
			sio.emit('submission:removed', {id: id}, socket.id);
		}
		appEvents.on('submission:removed', submissionRemovedHandler);

		/* TABLET NAMESPACE */

		function feedbackScanningHandler(progress) {
			sio.emit('feedback:scanning',{progress: progress}, socket.id);
		}
		socket.on('feedback:scanning',feedbackScanningHandler)
		appEvents.on('feedback:scanning', feedbackScanningHandler);

	    // Clean up after disconnect
	    socket.on('disconnect', function(){
	        print('Socket: Client disconnected');

	        //remove server events
	        appEvents.removeListener('submission:new',submissionAddedHandler);
	        appEvents.removeListener('submission:removed',submissionRemovedHandler);
	        appEvents.removeListener('feedback:scanning',feedbackScanningHandler);
	    });

	});

};