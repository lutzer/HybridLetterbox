var express = require('express');
var _ = require('underscore');
var multipart = require('connect-multiparty');

var appEvents = r_require('/utils/appEvents.js');
var Submission = r_require('/models/submission');
var Utils = r_require('/utils/utils');

var router = express.Router();

var fileUploader = multipart({
    uploadDir: Config.uploadDirTmp,
    autoFiles: true
});

/*
 * POST /api/file/attach/:submissionId
 */ 
router.post('/attach/:submissionId', fileUploader, function(req,res){

	Submission.findOne({ _id: req.params.submissionId }, (err, submission) => {
		if (Utils.handleError(err,res))
            return;

        if (!submission) {
        	res.status(500).send({error: 'submission not found'});
        	return;
        }

        if (!req.files.file) {
            res.status(500).send({error: 'no file submitted'});
            return;
        }

        submission.addFile(req.files.file, (err,model) => {
        	if (Utils.handleError(err,res))
            	return;

             print('Uploaded file'+req.files.file.originalFilename+' for '+req.params.submissionId);

            appEvents.emit('submission:changed',submission);
			res.send(model);
        });
	});
});

module.exports = router;