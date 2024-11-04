const express = require('express')
const Routing = express.Router() 

const shopRouts = require('../controllers/shop.js')
const { routing } = require('./admin.js')


Routing.get('/', shopRouts.getIndex)
Routing.get('/product', shopRouts.getProduct)
Routing.get('/product/:id', shopRouts.getOneProduct)
Routing.get('/cart', shopRouts.getCart)
Routing.post('/cart', shopRouts.postToCart)
Routing.post('/caer-delete-item', shopRouts.postDeleteCartItem )
Routing.post('/crate-order', shopRouts.postOrder)
Routing.get('/checkout', shopRouts.getCheckout)
Routing.get('/orders', shopRouts.getOrder)


module.exports = Routing