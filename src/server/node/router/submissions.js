var express = require('express');
var _ = require('underscore');
var htmlspecialchars = require('htmlspecialchars');

var appEvents = r_require('/utils/appEvents.js');
var Utils = r_require('/utils/utils');

var Submission = r_require('/models/submission');

var router = express.Router();

/*
 * GET /api/submissions/
 */ 
router.get('/',(req,res) => {
    Submission.find({}, (err,models) => {
        if (Utils.handleError(err,res))
            return;
        res.send(models);
    });
});

/*
 * GET /api/submissions/:id
 */ 
router.get('/:id',(req,res) => {
    Submission.findOne({ _id: req.params.id} , (err,model) => {
        if (Utils.handleError(err,res))
            return;
        res.send(model);
    });
});

/*
 * POST /api/submissions/
 */ 
router.post('/', (req, res) => {

    var submission = new Submission(req.body);
    //insert data
    submission.save((err, model) => {
        if (Utils.handleError(err,res))
            return;

        print('Submission added to database');

        // trigger socket event and send message to web app
        appEvents.emit('submission:new',model)
        res.send(model);
    });
});

/*
 * DELETE /api/submissions/:id
 */
router.delete('/:id', (req, res) => {
    Submission.remove({ _id: req.params.id }, (err, obj) => {
        if (Utils.handleError(err,res))
            return;

        if (obj.result.n > 0) {
            print("Submission "+req.params.id+" deleted from database");
            appEvents.emit('submission:removed',req.params.id)
        }
        res.send( {removed: obj.result.n} );
    });
});

module.exports = router;