const express = require('express');
const router = express.Router();
const excelParse = require('../middleware/excel-parse');
const Product = require('../database/product-model.js');
const Temp = require('../database/temp-model');

router.get('/', async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

router.get('/new', async (req, res) => {
  const draftProducts = await Temp.find({});
  res.render('product', {
    draftProducts
  });
})

router.post('/excel', excelParse, (req, res) => {
  req.excelParsedData.forEach(async object => {
    const tempProduct = new Temp(object);
    await tempProduct.save();
  });
  res.redirect('/products/new');
})

router.post('/save', async (req, res) => {
  console.log(req.body);
  await Temp.deleteMany({});
  res.redirect('/products/new');
})

module.exports = router;
