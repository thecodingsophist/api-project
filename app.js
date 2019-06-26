const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/api-project');

const bodyParser = require('body-parser');

const methodOverride = require('method-override');

//override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// const Project = require('./models/project')
const todosController = require('./controllers/todo.js')
const projectsController = require('./controllers/projects.js')

const port = process.env.PORT || 3000;

todosController(app);
projectsController(app);
// http://localhost/project/projects/:id/edit



app.listen(port);
// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// })

module.exports = app;
