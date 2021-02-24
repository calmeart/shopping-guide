require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const excelParse = require('./middleware/excel-parse');
const productsRoute = require('./routes/products');

const session = require('express-session');
const passport = require('passport');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const User = require('./database/user-model');
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


require('./database/connection')();

app.use('/products', productsRoute);


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

app.route('/users')
  .get((req, res) => {
    if (req.user) {
      res.render('users', {userDetails: req.user});
    } else {
      res.redirect('/');
    }

  });

app.route('/testproducts')
  .get((req, res) => {
    res.render('product');
  });




app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
