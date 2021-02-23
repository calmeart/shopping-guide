require('dotenv').config();
const express = require('express');
const app = express();
const formidable = require('formidable');
const readXlFile = require('read-excel-file/node');


app.set('view engine', 'ejs')

require('./database/connection')();

const dataApp = [];

app.route('/')
  .get((req, res) => {
    res.render('home');
  })
  .post((req, res) => {
    const form = formidable({
      multiples: true
    });
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      res.json({fields, files});
      console.log(files.someExpressFiles.path)
      readXlFile(files.someExpressFiles.path).then((rows) => {
        console.log(rows);
      }).catch(err => console.log(err));
    });
  });

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port: ${process.env.PORT}`);
});
