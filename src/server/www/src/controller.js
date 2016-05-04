/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 12:06:07
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import SIO from 'socketio';
import Config from 'config';

import SubmissionListView from 'views/submission_list_view';

class Controller extends Marionette.Controller {
		
		constructor(app) {

			super();

			this.app = app;
			
			app.addRegions({
				contentRegion: "#content",
				modalRegion: "#modal-container"
			});
			
			//register client events
			Backbone.on('dialog:open', this.openDialog, this);
			Backbone.on('dialog:close', this.closeDialog, this);

			//register socket events
			var socket = SIO(Config.web_socket_url);
            socket.on('submissions:added', function(data) {
                Backbone.trigger('submissions:added',data);
            });
		}
			
		/* ROUTES */

		showSubmissionList() {
			this.app.contentRegion.show(new SubmissionListView({ id: 'bla' }));
		}

		showScanningDialog() {
			alert("ScanningDialog")
		}

		openDialog() {

		}

		closeDialog() {

		}

		
};

export default Controller
	