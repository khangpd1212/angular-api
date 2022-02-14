const Post = require('../models/blog');

// get all posts
exports.getPosts = (req, res, next) => {
    Post.findAll()
        .then(result => {
            res.status(200).json({
                message: `Fetch posts successfully`,
                posts: result
            })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
   
};
// get post id
exports.getPostById = (req, res, next) => {
    let postId = req.params.postId;
    Post.findByPk(postId)
        .then(result => {
            if(!result){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({
                message: 'This post is found',
                post: result
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
// create post
exports.createPost = (req, res, next) => {
    let title = req.body.title;
    let content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        create_date: new Date().toISOString()
    });

    post.save()
        .then(result => {
            res.status(201).json({
                message: 'Post has been created successfully',
                post: result
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};
//update post
exports.updatePost = (req, res, next) => {
    let postId = req.params.postId;
    let title = req.body.title;
    let content = req.body.content;

    Post.findByPk(postId)
        .then(post => {
            if(!post){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error
            }
            post.title = title;
            post.content = content;
            return post.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Post has been updated successfully',
                post: result
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
                next(err);
            }
        });
};
// delete post
exports.deletePost = (req, res, next) => {
    let postId = req.params.postId;

    Post.findByPk(postId)
        .then(post => {
            if(!post){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error;
            }

            return post.destroy(postId);
        })
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'This post has been deleted'
            });
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
};