var express = require('express');
var _ = require('underscore');

var appEvents = r_require('/utils/appEvents.js');
var Submission = r_require('/models/submission');
var Utils = r_require('/utils/utils');

var router = express.Router();

/*
 * POST /api/file/attach/:submissionId
 */ 
router.post('/attach/:submissionId',function(req,res){
	
	print('Uploading file for '+req.params.submissionId);

	Submission.findOne({ _id: req.params.submissionId }, (err, submission) => {
		if (Utils.handleError(err,res))
            return;

        if (!submission) {
        	res.send({error: 'submission not found'});
        	return;
        }

        console.log(req.files);

        submission.addFiles(req.files, (err,urls) => {
        	if (Utils.handleError(err,res))
            	return;

            appEvents.emit('submission:changed',submission);
			res.send({ files: urls});
        });
	});
});

module.exports = router;