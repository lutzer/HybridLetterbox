var express = require('express');
var _ = require('underscore');
var htmlspecialchars = require('htmlspecialchars');


var config = r_require('/config.js');
var submissions = r_require('/models/submissions');
var appEvents = r_require('/utils/appEvents.js');
var utils = r_require('/utils/utils');

var router = express.Router();

/*
 * GET /api/submissions/
 */ 
router.get('/',function(req,res){

    submissions.list({},function(err,docs) {
        utils.handleError(err,res);
        res.send(docs);
    });
});

/*
 * GET /api/submissions/:id
 */ 
router.get('/:id',function(req,res){
    submissions.get(req.params.id, function(err,doc) {
        utils.handleError(err);
        res.send(doc);
    });
});

/*
 * POST /api/submissions/
 */ 
router.post('/', function (req, res) {

    console.log('Received new Submission');

    console.log(req.body);

    var data = {
        message : req.body.message
    };

    //insert data
    submissions.insert(data, function(err, docs) {

        utils.handleError(err);

        console.log('Submission added to database');

        object = docs[0];
        var objectId = object._id;

        // trigger socket event and send message to web app
        appEvents.emit('submission:new',object)

        // send answer
        res.send(object);
    });
    
});

/*
 * DELETE /api/submissions/:id
 */
router.delete('/:id', function(req, res) {
    submissions.remove(req.params.id, function(err,doc) {

        console.log('Submission deleted from database');

        utils.handleError(err);
        res.sendStatus(doc);
    });
});

module.exports = router;