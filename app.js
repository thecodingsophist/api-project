const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
var User = require('./models/user.js')
const auth = require('./config/middleware/isAuthenticated')

// mongodb
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/api-project');

// dotenv
require('dotenv').config()

// authentication
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    // callbackURL: "https://shrouded-ridge-38664.herokuapp.com/auth/google/callback"
    callbackURL: "https://shrouded-ridge-38664.herokuapp.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      console.log("User", profile)
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
           if (user) {
               console.log("user found")
           }
         return done(err, user);
       });

  }
));

// serialize/deserialize

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if (user) {
            console.log("user in deserialize")
        }
        done(err, user);
    });
});

// sessions
var session = require("express-session");

// bodyParser
const bodyParser = require('body-parser');

const methodOverride = require('method-override');

//override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: true}));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// authenticate
app.use(passport.initialize());
app.use(passport.session());

// const Project = require('./models/project')
const todosController = require('./controllers/todo.js')
const projectsController = require('./controllers/projects.js')
// const authController = require('./controllers/auth.js')
const authRoutes = require('./routes/routes.js')

const port = process.env.PORT || 3000;

authRoutes(app, passport);
//authentication for the todos and projects controller
app.use(auth)
todosController(app);
projectsController(app);

// authController(app, passport);

// authenticate routes
// app.get('/auth/google',
//   passport.authenticate('google', { scope:
//       [ 'https://www.googleapis.com/auth/plus.login',
//       , 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
// ));
//
// app.get( '/auth/google/callback',
//     passport.authenticate( 'google', {
//         successRedirect: '/auth/google/success',
//         failureRedirect: '/auth/google/failure'
// }));


app.listen(port);
// app.listen(3000, () => {
//     console.log('App listening on port 3000!')
// })

module.exports = app;
