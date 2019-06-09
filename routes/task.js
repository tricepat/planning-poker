const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task');

router.get('/:id', taskController.findTaskById);
router.post('/new', taskController.createTask);
router.post('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
