import Marionette from 'marionette'
import _ from 'underscore'

class SubmissionListView extends Marionette.ItemView {

	get template() { return _.template('<div>Hello World</div') }

	get className() { return 'page' }

	initialize(options) {
		console.log(options)
	}
};

export default SubmissionListView