const Todo = require('../models/todo');
const Auth = require('../config/middleware/isAuthenticated')

module.exports = (app) => {
    app.post('/projects/:projectId/todos', Auth, (req, res) => {
      Todo.create(req.body).then(todo => {
        res.redirect(`/projects/${todo.projectId}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });

    app.get('/projects/todo/:id/edit', Auth, function (req, res) {
        Todo.findById(req.params.id, function(err, todo) {
            res.render('partials/todo-edit', {todo: todo} );
        }).catch ( (error) => {
            console.log(error.message)
        })

    })
    // update comment
    app.put('/projects/todos/:id', Auth, (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, req.body)
            .then(todo=> {
                res.redirect(`/projects/${todo.projectId}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    app.delete('/projects/todos/:id', Auth, (req, res) => {
        console.log(`delete todo id ${req.params.id}`)
      Todo.findByIdAndRemove(req.params.id).then(todo => {
        console.log(todo)
        res.redirect(`/projects/${todo.projectId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
}
