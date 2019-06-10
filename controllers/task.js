const Task = require('../models/task');
const Poll = require('../models/poll');

exports.findTaskById = function (req, res, next) {
  console.log('Getting task by ID ' + req.params.id);
  Task.findById(req.params.id, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};

// create task and add to poll
exports.createTask = function (req, res, next) {
  console.log('Creating task with name ' + req.body.name + ', desc:' + req.body.description);
  var task = new Task({
    name: req.body.name,
    description: req.body.description
  });
  Poll.findById(req.body.pollId, function (err, poll) {
    if (err) return next(err);
    if (!poll) {
      return res.status(400).send(new Error('Task does not exist!'));
    }
    console.log('[taskController] found poll: ' + poll);
    // create task and add task to poll
    Task.create(task, function (err, task) {
      if (err) return next(err);
      console.log('[taskController] created task. adding to poll');
      poll.addTask(task, function(err, doc) {
        if (err) return next(err);
        return res.json(doc);
      })
      //res.status(200).json(task);
    })
    // task.save(function (err) {
    //   if (err) {
    //     return next(err);
    //   }
    //   res.status(200).json(task);
    // });
  });
};

exports.updateTask = function (req, res, next) {
  console.log('updating task ' + req.params.id);
};

exports.deleteTask = function (req, res, next) {
  console.log('deleting task ' + req.params.id);
};
