const express = require('express')
const Routing = express.Router() 

const productControllers = require('../controllers/admin.js')

Routing.get('/add-product',productControllers.getAddProduct)
Routing.post('/add-product',productControllers.postAddProduct)
Routing.get('/edit-product/:id',productControllers.putEditProduct)
Routing.post('/delete-product',productControllers.deleteProduct)
Routing.post('/edit-product',productControllers.postEditProduct)
Routing.get('/product', productControllers.getAllProduct)

exports.routing = Routing
