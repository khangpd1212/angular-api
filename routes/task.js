const express = require('express');
const taskController = require('../controllers/task');
const router = express.Router();

// get blog 
router.get('/tasks', taskController.getTask);
// get blog by id
router.get('/tasks/:taskId', taskController.getTaskById);

// post blog
router.post('/tasks', taskController.createTask);

//update blog
router.put('/tasks/:taskId', taskController.updateTask);

//delete blog
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;