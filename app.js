require('dotenv').config();
const express = require('express');
const app = express();
const excelParse = require('./middleware/excel-parse');


app.set('view engine', 'ejs')

require('./database/connection')();

const dataApp = [];

app.route('/')
  .get((req, res) => {
    res.render('home');
  })
  .post(excelParse, (req, res) => {
    res.json(req.excelParsedData);
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
