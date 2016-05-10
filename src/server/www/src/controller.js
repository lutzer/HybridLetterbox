/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-10 17:32:00
*/

import Backbone from 'backbone';
import Marionette from 'marionette';
import SIO from 'socketio';
import Config from 'config';

import MainView from 'views/main_view';
import SubmissionListView from 'views/submission_list_view';
import TagListView from 'views/tag_list_view';

class Controller extends Marionette.Controller {
		
		constructor(app) {

			super();

			this.app = app;
			
			app.addRegions({
				containerRegion: "#container",
				modalRegion: "#modal-container"
			});
			
			//register client events
			Backbone.on('dialog:open', this.openDialog, this);
			Backbone.on('dialog:close', this.closeDialog, this);

			//register socket events
			var socket = SIO(Config.web_socket_url);
            socket.on('submission:changed', function(data) {
            	Backbone.trigger('submission:changed',data);
            });

            //load mainview
            this.mainView = new MainView();
            this.app.containerRegion.show(this.mainView);
		}
			
		/* ROUTES */

		showSubmissionList(tag=null) {

			this.mainView.contentRegion.show(new SubmissionListView({ tag: tag }));
			this.mainView.tagsRegion.show(new TagListView());
		}

		postSubmission() {
			alert('post submission');
		}

		showScanningDialog() {
			alert("ScanningDialog");
		}

		openDialog() {

		}

		closeDialog() {

		}

		
};

export default Controller
	