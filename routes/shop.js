const express = require('express')
const Routing = express.Router() 

const shopRouts = require('../controllers/shop.js')


Routing.get('/', shopRouts.getIndex)

Routing.get('/product', shopRouts.getProduct)

Routing.get('/product/:id', shopRouts.getOneProduct)

Routing.get('/cart', shopRouts.getCart)
Routing.post('/cart', shopRouts.postToCart)

Routing.post('/caer-delete-item', shopRouts.postDeleteCartItem )

Routing.get('/checkout', shopRouts.getCheckout)

Routing.get('/orders', shopRouts.getOrder)

Routing.get('/orders/jhgadkfjghdhfgadfjgdhfg', (req,res,next)=>{
  req.params.id
  res.render('./shop/cart', { docTitle:"Cart",path:'/cart'})
})



module.exports = Routing