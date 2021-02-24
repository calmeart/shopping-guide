require('dotenv').config();
const express = require('express');
const app = express();
const excelParse = require('./middleware/excel-parse');
const productsRoute = require('./routes/products');

app.set('view engine', 'ejs')
app.use(express.static('public'));

require('./database/connection')();

app.use('/products', productsRoute);

app.route('/')
  .get((req, res) => {
    res.render('home');
  });

app.route('/users')
  .get((req, res) => {
    res.render('users');
  });

app.route('/testproducts')
  .get((req, res) => {
    res.render('product');
  });




app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
