/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 11:38:41
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 11:41:13
*/

import Backbone from 'backbone';
import SubmissionModel from 'models/submission_model';
import Config from 'config';

class SubmissionCollection extends Backbone.Collection {

	get model() { return SubmissionModel }

	get url() { return Config['web_service_url']+"submissions" }
};

export default SubmissionCollection