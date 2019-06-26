const mongoose = require('mongoose');

const Project = mongoose.model('Project', {
    title: String,
    description: String,
});

module.exports = Project
