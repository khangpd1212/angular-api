const Project = require('../models/project');

// get all project
exports.getProject = (req, res, next) => {
    Project.findAll()
        .then(result => {
            res.status(200).json({
                message: `Fetch posts successfully`,
                projects: result
            })
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            next(err);
        });
   
};
// get project id
exports.getProjectById = (req, res, next) => {
    let projectId = req.params.projectId;
    Project.findByPk(projectId)
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
// create project
exports.createProject = (req, res, next) => {
    let name = req.body.name;
    let date = req.body.date;
    let teamSize = req.body.teamSize;
    const project = new Project({
        name: name,
        date: date,
        teamSize: teamSize
    });

    project.save()
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
//update project
exports.updateProject = (req, res, next) => {
    let projectId = req.params.projectId;
    let name = req.body.name;
    let date = req.body.date;
    let teamSize = req.body.teamSize;
    Project.findByPk(projectId)
        .then(project => {
            if(!project){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error
            }
            project.name = name;
            project.date = date;
            project.teamSize = teamSize;
            return project.save();
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
// delete project
exports.deleteProject = (req, res, next) => {
    let projectId = req.params.projectId;

    Project.findByPk(projectId)
        .then(project => {
            if(!project){
                let error = new Error('This post is not found');
                error.statusCode = 404;
                throw error;
            }

            return project.destroy(projectId);
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