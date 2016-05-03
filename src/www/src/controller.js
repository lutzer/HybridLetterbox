import Backbone from 'backbone';
import Marionette from 'marionette';

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
			/*var socket = io(config.web_socket_url);
            socket.on('submissions:added', function(data) {
                Backbone.trigger('submissions:added',data);
            });*/

            //fetch settings
            /*Backbone.settings = new AppModel({id: 1});
            Backbone.settings.fetch();*/
		}
			
		/* ROUTES */

		showSubmissionList() {
			this.app.contentRegion.show(new SubmissionListView({ id: 'bla' }));
		}

		showScanningDialog() {
			alert("ScanningDialog")
		}

		
};

export default Controller
	