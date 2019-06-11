const Poll = require('../models/poll');

exports.findPollById = function (req, res, next) {
  Poll.findById(req.params.id, function (err, poll) {
    if (err) return next(err);
    res.status(200).json(poll);
  });
};

exports.createPoll = function (req, res, next) {
  var poll = new Poll(
    { name: req.body.name }
  );
  poll.save(function (err) {
    if (err) return next(err);
    res.status(200).json(poll);
  });
};

// TODO
exports.updatePoll = function (req, res, next) {
};

// TODO
exports.deletePoll = function (req, res, next) {
};
