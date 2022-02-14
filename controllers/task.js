const Task = require('../models/task');

// get all posts
exports.getTask = (req, res, next) => {
    Task.findAll()
        .then(result => {
            res.status(200).json({
                message: `Fetch posts successfully`,
                tasks: result
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
exports.getTaskById = (req, res, next) => {
    let taskId = req.params.taskId;
    Task.findByPk(taskId)
        .then(result => {
            if(!result){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error;
            }

            res.status(200).json({
                message: 'This post is found',
                tasks: result
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
exports.createTask = (req, res, next) => {
    let name = req.body.name;
    let description = req.body.description;
    let project = req.body.project;
    let priority = req.body.priority;
    let assignedTo = req.body.assignedTo;
    let status = req.body.status;
    const task = new Task({
        name: name,
        description: description,
        project: project,
        priority: priority,
        assignedTo: assignedTo,
        status: status
    });

    task.save()
        .then(result => {
            res.status(201).json({
                message: 'Post has been created successfully',
                task: result
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
exports.updateTask = (req, res, next) => {
    let taskId = req.params.taskId;
    let name = req.body.name;
    let description = req.body.description;
    let project = req.body.project;
    let priority = req.body.priority;
    let assignedTo = req.body.assignedTo;
    let status = req.body.status;

    Task.findByPk(taskId)
        .then(task => {
            if(!task){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error
            }
            task.name = name;
            task.description = description;
            task.project = project;
            task.priority = priority;
            task.assignedTo = assignedTo;
            task.status = status;
            return task.save();
        })
        .then(result => {
            res.status(200).json({
                message: 'Post has been updated successfully',
                task: result
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
exports.deleteTask = (req, res, next) => {
    let taskId = req.params.taskId;

    Task.findByPk(taskId)
        .then(task => {
            if(!task){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error;
            }

            return task.destroy(taskId);
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