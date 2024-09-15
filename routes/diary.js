const express = require('express');
const router = express.Router();
const addProduct = require('../controllers/addProduct');
const deleteProduct = require('../controllers/deleteProduct');

router.post('/add', addProduct);

router.delete('/delete/:productId', deleteProduct);

module.exports = router;
