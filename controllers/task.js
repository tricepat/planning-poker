const Task = require('../models/task');

exports.findTaskById = function (req, res) {
    res.send('Getting poll by ID ' + req.params.id);
    Task.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    });
};

exports.createTask = function (req, res) {
    res.send('Creating task!');
};

exports.updateTask = function (req, res) {
    res.send('updating task ' + req.params.id);
};

exports.deleteTask = function (req, res) {
    res.send('deleting task ' + req.params.id);
};
