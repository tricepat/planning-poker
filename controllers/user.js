const User = require('../models/user');

exports.findUserById = function (req, res, next) {
  console.log('Getting user by ID ' + req.params.id);
  User.findById(req.params.id, function (err, user) {
    if (err) return next(err);
    res.send(user);
  });
};

exports.createUser = function (req, res, next) {
  console.log('Creating user with name ' + req.body.name);
  var user = new User(
    {
      name: req.body.name
    }
  );
  user.save(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json(user);
  })
};

exports.updateUser = function (req, res, next) {
  res.send('updating user ' + req.params.id);
};

exports.deleteUser = function (req, res, next) {
  res.send('deleting user ' + req.params.id);
};
