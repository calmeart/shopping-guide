require('dotenv').config();
const express = require('express');
const app = express();
const excelParse = require('./middleware/excel-parse');
const productsRoute = require('./routes/products');

app.set('view engine', 'ejs')

require('./database/connection')();

app.use('/products', productsRoute);

app.route('/')
  .get((req, res) => {
    res.render('home');
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
