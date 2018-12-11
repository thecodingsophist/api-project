
// const Project = require('./models/project')
const todosController = require('./controllers/todo.js')

var exphbs = require('express-handlebars');

const express = require('express')
const app = express()

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/api-project');

const bodyParser = require('body-parser');

const methodOverride = require('method-override')

//override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const projects = require('./controllers/projects')(app);
const port = process.env.PORT || 3000;

todosController(app);

app.listen(port);
// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// })

module.exports = app;
