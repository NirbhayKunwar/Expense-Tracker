const express = require('express');
const router = express.Router();
const { getTasks, createTask, deleteTask } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');

// Get all tasks
router.get('/', protect, getTasks);

// Create new task
router.post('/', protect, createTask);

// Delete task
router.delete('/:id', protect, deleteTask);

module.exports = router;
