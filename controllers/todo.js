const Todo = require('../models/todo');
// const Auth = require('../config/middleware/isAuthenticated')

module.exports = (app) => {
    app.post('/projects/:projectId/todos', (req, res) => {
      Todo.create(req.body).then(todo => {
        res.redirect(`/projects/${todo.projectId}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });

    // edit todo
    app.get('/projects/todos/:id/edit', function (req, res) {
        Todo.findById(req.params.id, function(err, todo) {
            res.render('partials/todo-edit', {todo: todo} );
        }).catch ( (error) => {
            console.log(error.message)
        })

    })
    // update comment
    app.put('/projects/todos/:id', (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, req.body)
            .then(todo => {
                res.redirect(`/projects/${todo.projectId}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // delete comment
    app.delete('/projects/todos/:id', (req, res) => {
        console.log(`delete todo id ${req.params.id}`)
      Todo.findByIdAndRemove(req.params.id).then(todo => {
        console.log(todo)
        res.redirect(`/projects/${todo.projectId}`);
      }).catch((err) => {
        console.log(err.message);
      })
    })
}
