const User = require('../models/user');

exports.findUserById = function (req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.createUser = function (req, res, next) {
  var user = new User( { name: req.body.name } );
  user.save(function (err) {
    if (err) return next(err);
    res.status(200).json(user);
  })
};

// TODO
exports.updateUser = function (req, res, next) {
};

// TODO
exports.deleteUser = function (req, res, next) {
};
