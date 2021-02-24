const passport = require('passport');
const User = require('../database/user-model');

module.exports = (app) => {
  app.route('/')
    .get((req, res) => {
      if (req.user) {
        res.redirect('/users');
        return;
      }
      res.render('home');
    });

  app.route('/register')
    .get((req, res) => {
      res.render('register');
    })
    .post((req, res) => {
      User.register(new User({
        username: req.body.username,
        accountType: "member"
      }), req.body.password, function(err, result) {
        if (err) {
          return res.render('register');
        }
        passport.authenticate('local')(req, res, function() {
          res.redirect('/users');
        })
      })
    })

  app.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/users');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });
}
