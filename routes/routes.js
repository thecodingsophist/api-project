// routes/routes.js

module.exports = function(app, passport) {

    // route for home page
    app.get('/', function(req, res) {
        if (req.isAuthenticated()) {
            res.redirect("/home");
        } else {
        res.render('login', {}); // load the login.handlebars file
    }
    });

    // route for login form
    // route for processing the login form
    // route for signup form
    // route for processing the signup form

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
                    successRedirect : '/home',
                    failureRedirect : '/'
            }));

};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they are not authenticated redirect them to the home page
    res.redirect('/');
}
