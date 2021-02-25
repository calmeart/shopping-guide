require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const excelParse = require('./middleware/excel-parse');
const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');

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

require('./middleware/passport-config')();
require('./database/connection')();
require('./routes/authentication')(app);

app.use('/products', productsRoute);
app.use('/users', usersRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
