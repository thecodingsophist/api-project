//charity.js
const express = require('express');
const Todo = require('../models/todo');
const app = express()
const Project = require('../models/project');
// var express = require('express')
// var router = express.Router()


module.exports = (app) => {
  //INDEX
  app.get('/', (req, res) => {
      Project.find()
          .then(projects => {
              console.log("GET HERE" + projects)
              res.render('projects-index', { projects: projects });
          })
          .catch(err => {
              console.log(err);
          })
  })

  //NEW
  app.get('/projects/new', (req, res) => {
      res.render('projects-new', {});
  })

  //CREATE
  app.post('/projects', (req, res) => {
    Project.create(req.body).then((project) => {
      // console.log(req.body);
      console.log("HELLLOOOOOO" + project);
      res.redirect(`/projects/${project._id}`); // Redirect to projects/:id
    }).catch((err) => {
      console.log(err.message);
    })
  })

  //SHOW
  app.get('/projects/:id', (req, res) => {
      //find project
      Project.findById(req.params.id).then((project) => {
          Todo.find({projectId: req.params.id}).then(todos => {
              console.log("THIS IS TODO" + todos)
              res.render('projects-show', {project: project, todos: todos })
          })
      }).catch((err) => {
          console.log(err.message);
      });
  });

  //EDIT
  app.get('/projects/:id/edit', function (req, res) {
      console.log("just did an edit")
      Project.findById(req.params.id, function(err, project) {
          console.log("Not having problems")
          res.render('projects-edit', { project: project } );
      }).catch ( (error) => {
          console.log(error.message)
      })

  })

  //DELETE
  app.delete('/projects/:id', function (req, res) {
      console.log("DELETE project")
      Project.findByIdAndRemove(req.params.id)
        .then((project) => {
          res.redirect('/');
      }).catch((err) => {
          console.log(err.message);
      })
  })

  //UPDATE
  app.put('/projects/:id', (req, res) => {
      console.log("updating")
      Project.findByIdAndUpdate(req.params.id, req.body)
          .then((project) => {
              console.log("more updating")
              res.redirect(`/projects/${project._id}`);
          })
          .catch(err => {
              console.log(err.message)
          })
  })
}
// module.exports = router
// module.exports = app
