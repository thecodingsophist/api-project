const mongoose = require('mongoose');

const Todo = require('./todo.js');

const Project = mongoose.model('Project', {
    title: String,
    description: String,
});

module.exports = Project
