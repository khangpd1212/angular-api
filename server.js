const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const blogRoutes = require('./routes/blog');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const projectRoutes = require('./routes/project');


const app = express();
app.use(bodyParser.json());
const port = 3000;
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    res.header('Access-Control-Allow-Headers',
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, X-ACCESS-TOKEN");
    next();
})
app.use('/blog', blogRoutes);
app.use('/auth', authRoutes);
app.use('/task', taskRoutes);
app.use('/project', projectRoutes);

sequelize
    .sync()
    .then(result => {
        app.listen(port, () => {
            console.log(`dang chay voi port ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    })