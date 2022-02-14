const express = require('express');
const projectController = require('../controllers/project');
const router = express.Router();

// get blog 
router.get('/projects', projectController.getProject);
// get blog by id
router.get('/projects/:projectId', projectController.getProjectById);

// post blog
router.post('/projects', projectController.createProject);

//update blog
router.put('/projects/:projectId', projectController.updateProject);

//delete blog
router.delete('/projects/:projectId', projectController.deleteProject);

module.exports = router;