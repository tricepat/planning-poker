const Task = require('../models/task');
const Poll = require('../models/poll');

exports.findTaskById = function (req, res, next) {
  Task.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.status(200).json(product);
  });
};

exports.findTasksByPollId = function (req, res, next) {
  Task.find({pollId: req.params.id}, function (err, tasks) {
    if (err) return next(err);
    res.status(200).json(tasks);
  });
};

exports.createTask = function (req, res, next) {
  // ensure poll exists first
  Poll.findById(req.body.pollId, function (err, poll) {
      if (err) return next(err);
      Task.create({pollId: req.body.pollId, name: req.body.name, description: req.body.description}, function (err, task) {
        if (err) return next(err);
        // add task ID to poll
        poll.tasks.push(task._id);
        poll.save();
        res.status(200).json(task);
      });
  });
};

exports.vote = function (req, res, next) {
  var userId = req.body.userId;
  // add or update user's vote. task.votes is map of userId: value
  Task.findById(req.params.id, function (err, task) {
    task.votes.set(userId, req.body.value);
    task.save();
    res.status(200).json(task);
  });
};

exports.updateTask = function (req, res, next) {
  var values = req.body;
  Task.findByIdAndUpdate(req.params.id, {$set: values}, {new: true}, function (err, task) {
    if (err) return next(err);
    res.status(200).json(task);
  });
};

// TODO
exports.deleteTask = function (req, res, next) {
};
