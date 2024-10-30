const express = require('express')

const path = require('path')

const rootDir = require('../utils/path')

const Routing = express.Router() 

Routing.get('/add-product',(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','add_product.html'))
})

Routing.post('/add-product',(req,res,next)=>{
  console.log(req.body)
  res.redirect('/')
})

module.exports = Routing