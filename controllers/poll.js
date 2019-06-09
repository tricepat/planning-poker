const Poll = require('../models/poll');

exports.findPollById = function (req, res) {
    console.log('Getting poll by ID ' + req.params.id);
    Poll.findById(req.params.id, function (err, poll) {
        if (err) return next(err);
        res.send(poll);
    });
};

exports.createPoll = function (req, res, next) {
    console.log('Creating poll with name ' + req.body.name);
    var poll = new Poll(
        {
            name: req.body.name
        }
    );
    poll.save(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json(poll);
    })
};

exports.updatePoll = function (req, res) {
    res.send('updating poll ' + req.params.id);
};

exports.deletePoll = function (req, res) {
    res.send('deleting poll ' + req.params.id);
};
