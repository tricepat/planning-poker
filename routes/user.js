const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/:id', userController.findUserById);
router.post('/new', userController.createUser);
router.post('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
