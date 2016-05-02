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
router.get('/',function(req,res){

    Submission.find({},function(err,models) {
        Utils.handleError(err,res);
        res.send(models);
    });
});

/*
 * GET /api/submissions/:id
 */ 
router.get('/:id',function(req,res){
    Submission.findOne({ _id: req.params.id} , function(err,model) {
        res.send(model);
    });
});

/*
 * POST /api/submissions/
 */ 
router.post('/', function (req, res) {

    print('Received new Submission');

    var submission = new Submission (req.body);

    //insert data
    submission.save(function(err, model) {
        Utils.handleError(err);

        print('Submission added to database');

        // trigger socket event and send message to web app
        appEvents.emit('submission:new',model)
        res.send(model);
    });
    
});

/*
 * DELETE /api/submissions/:id
 */
router.delete('/:id', function(req, res) {
    Submission.remove({ _id: req.params.id }, function(err, obj) {
        Utils.handleError(err);

        if (obj.result.n > 0) {
            print("Submission "+req.params.id+" deleted from database");
            appEvents.emit('submission:removed',req.params.id)
        }

        res.send( {removed: obj.result.n} );
    });
});

module.exports = router;