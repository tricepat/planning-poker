const express = require('express');
const router = express.Router();
const pollController = require('../controllers/poll');

router.get('/:id', pollController.findPollById);
router.post('/new', pollController.createPoll);
router.post('/:id', pollController.updatePoll);
router.post('/:id/addTask', pollController.addTask);
router.delete('/:id', pollController.deletePoll);

module.exports = router;
