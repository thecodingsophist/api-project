// routes/routes.js

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        res.render('login', {}); // load the login.handlebars file
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

    // route for showing the profile page
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.js', {
            user : req.user // get the user out of session and pass to template
        });
    });

    // route for logging out
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
            passport.authenticate('google', {
                    successRedirect : '/profile',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


//var faker = require("faker");

// var appRouter = function (app) {
//   app.get("/", function(req, res) {
//     res.status(200).send("Welcome to my To-Do API! Where you can add projects and their to-dos.");
//   });
//
//   app.get("")




//   app.get("/user", function (req, res) {
//   var data = ({
//     firstName: faker.name.firstName(),
//     lastName: faker.name.lastName(),
//     username: faker.internet.userName(),
//     email: faker.internet.email()
//   });
//   res.status(200).send(data);
// });
//
// app.get("/users/:num", function (req, res) {
//  var users = [];
//  var num = req.params.num;
//
//  if (isFinite(num) && num  > 0 ) {
//    for (i = 0; i <= num-1; i++) {
//      users.push({
//          firstName: faker.name.firstName(),
//          lastName: faker.name.lastName(),
//          username: faker.internet.userName(),
//          email: faker.internet.email()
//       });
//    }
//
//    res.status(200).send(users);
//
//  } else {
//    res.status(400).send({ message: 'invalid number supplied' });
//  }
//
// });

// module.exports = appRouter;
