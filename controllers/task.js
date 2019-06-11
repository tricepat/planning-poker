const Task = require('../models/task');
const Poll = require('../models/poll');

exports.findTaskById = function (req, res, next) {
  console.log('Getting task by ID ' + req.params.id);
  Task.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

exports.findTasksByPollId = function (req, res, next) {
  console.log('Getting tasks for poll ID ' + req.params.id);
  Task.find({pollId: req.params.id}, function (err, tasks) {
    if (err) return next(err);
    console.log('tasks: ' + tasks);
    res.status(200).json(tasks);
  });
};

exports.createTask = function (req, res, next) {
  console.log('Creating task for poll ID ' + req.body.pollId + ', name: ' + req.body.name + ', desc: ' + req.body.description);
  Task.create({pollId: req.body.pollId, name: req.body.name, description: req.body.description}, function (err, task) {
    if (err) return next(err);
    console.log('task created: ' + task);
    // add task ID to poll
    Poll.findByIdAndUpdate(req.body.pollId, {$push: {tasks: task._id}}, {new: true}, function (err, poll) {
      if (err) return next(err);
      console.log('added task id ' + task._id + ' to poll ' + req.body.pollId);
    });
    res.status(200).json(task);
  });
};

exports.vote = function (req, res, next) {
  var userId = req.body.userId;
  console.log('Voting on task ' + req.params.id + ', user: ' + userId + ', value: ' + req.body.value);
  // add or update user's vote
  // votes: {userId: value}
  Task.findById(req.params.id, function (err, task) {
    if (task.votes.has(userId)) {
      console.log('user previous vote: ' + task.votes.get(userId) + '. setting new vote: ' + req.body.value);
    } else {
      console.log('user first vote: ' + req.body.value);
    }
    task.votes.set(userId, req.body.value);
    task.save();
    res.status(200).json(task);
  });
};

exports.updateTask = function (req, res, next) {
  var values = req.body;
  console.log('updating task ' + req.params.id + ' with values ' + values);
  Task.findByIdAndUpdate(req.params.id, {$set: values}, {new: true}, function (err, task) {
    if (err) return next(err);
    console.log('updated task: ' + task);
    res.status(200).json(task);
  });
};

exports.deleteTask = function (req, res, next) {
  console.log('deleting task ' + req.params.id);
};
