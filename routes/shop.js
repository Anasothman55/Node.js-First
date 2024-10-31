const express = require('express')
const Routing = express.Router() 

const getProduct = require('../controllers/product.js')
Routing.get('/',getProduct.getProduct)

module.exports = Routing