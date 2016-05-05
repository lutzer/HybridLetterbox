/*
* @Author: Lutz Reiter, Design Research Lab, Universität der Künste Berlin
* @Date:   2016-05-04 12:43:57
* @Last Modified by:   lutzer
* @Last Modified time: 2016-05-04 17:40:38
*/

var express = require('express');
var _ = require('underscore');
var htmlspecialchars = require('htmlspecialchars');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Comment = r_require('/models/comment');
var Submission = r_require('/models/submission');

var router = express.Router();

/*
 * GET /api/comments/
 */ 
router.get('',(req,res) => {
    Comment.find({}, (err,models) => {
        Utils.handleError(err,res);
        res.send(models);
    });
});

/*
 * GET /api/comments/:id
 */ 
router.get('/:id',(req,res) => {
    Comment.findOne({ _id: req.params.id} , (err,model) => {
        if (Utils.handleError(err,res))
            return;
        res.send(model);
    });
});

/*
 * POST /api/comments/:id
 */ 
router.post('/:submissionId', (req, res) => {
    print('Received new Comment');

    var comment = new Comment(req.body)
    // insert comment
    Submission.findOne({ _id: req.params.submissionId }, (err,submission) => {
    	if (Utils.handleError(err,res))
            return;

        if (!submission) {
            res.send({error: 'submission not found'});
            return;
        }

    	submission.addComment(comment, (err) => {
    		if (Utils.handleError(err,res))
                return;

    		appEvents.emit('submission:changed',submission);
    		res.send(submission);
    	});
    });
});

/*
 * DELETE /api/comments/:id
 */
router.delete('/:id', (req, res) => {
    Comment.remove({ _id: req.params.id }, (err, obj) => {
        if (Utils.handleError(err,res))
            return;

        if (obj.result.n > 0) {
            print("Comment "+req.params.id+" deleted from database");
            //appEvents.emit('submission:changed',model);
        }
        res.send( {removed: obj.result.n} );
    });
});

module.exports = router;