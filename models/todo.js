const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Todo = mongoose.model('Todo', {
  content: String,
  projectId: { type: Schema.Types.ObjectId, ref: 'Project' }
});

module.exports = Todo
