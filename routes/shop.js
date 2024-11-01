const express = require('express')
const Routing = express.Router() 

const shopRouts = require('../controllers/shop.js')


Routing.get('/', shopRouts.getIndex)

Routing.get('/product', shopRouts.getProduct)

Routing.get('/cart', shopRouts.getCart)

Routing.get('/checkout', shopRouts.getCheckout)

Routing.get('/orders', shopRouts.getOrder)

module.exports = Routing