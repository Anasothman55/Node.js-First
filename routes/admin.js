const express = require('express')

const path = require('path')

const rootDir = require('../utils/path');

const Routing = express.Router() 

const db = [];

Routing.get('/add-product',(req,res,next)=>{
  res.sendFile(path.join(rootDir,'views','add_product.html'))
})

Routing.post('/add-product',(req,res,next)=>{
  db.push({title: req.body.title})
  res.redirect('/')
})



exports.routing = Routing
exports.db = db