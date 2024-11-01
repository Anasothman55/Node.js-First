const express = require('express')
const path = require('path')
const Routing = express.Router() 

const productControllers = require('../controllers/admin.js')

Routing.get('/add-product',productControllers.getAddProduct)
Routing.post('/add-product',productControllers.postAddProduct)
Routing.get('/product', productControllers.getAllProduct)

exports.routing = Routing
