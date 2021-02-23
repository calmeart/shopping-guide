const formidable = require('formidable');
const readXlFile = require('read-excel-file/node');
const convertExcelDate = require('./convert-excel-date');

module.exports = (req, res, next) => {
  const form = formidable({
    multiples: true
  });
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    readXlFile(files.someExpressFiles.path).then((rows) => {
      const productArray = [];
      for (let i = 1; i < rows.length; i++) {
        const temp = {
          date: convertExcelDate(rows[i][1]),
          product: rows[i][2],
          brand: rows[i][3],
          unit_price: rows[i][4],
          amount: rows[i][5],
          total_price: rows[i][6],
          store: rows[i][7],
          address: rows[i][8]
        };
        productArray.push(temp);
      };
      req.excelParsedData = productArray;
      next();
    }).catch(err => console.log(err));
  });
};
