const express = require('express');
const router = express.Router();
const Product = require('../database/product-model.js');
const userProductsDaily = require('../middleware/arrangeUserProductsDaily');

router.get('/', userProductsDaily, async (req, res) => {
  if (req.user) {
    res.render('users', {userDetails: req.user, userProducts: req.userProductsDaily});
  } else {
    res.redirect('/');
  }
})

module.exports = router;
