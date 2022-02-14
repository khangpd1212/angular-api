const express = require('express');
const blogController = require('../controllers/blog');
const router = express.Router();

// get blog 
router.get('/posts', blogController.getPosts);
// get blog by id
router.get('/posts/:postId', blogController.getPostById);

// post blog
router.post('/posts', blogController.createPost);

//update blog
router.put('/posts/:postId', blogController.updatePost);

//delete blog
router.delete('/posts/:postId', blogController.deletePost);

module.exports = router;