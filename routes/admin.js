const express = require('express')
const path = require('path')
const Routing = express.Router() 

const productControllers = require('../controllers/product.js')

Routing.get('/add-product',productControllers.getAddProduct)
Routing.post('/add-product',productControllers.postAddProduct)

exports.routing = Routing
