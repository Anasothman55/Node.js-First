const express = require('express')

const path = require('path')

const rootDir = require('../utils/path');

const Routing = express.Router() 

const db = [];

Routing.get('/add-product',(req,res,next)=>{
  res.render('add-product', {docTitle:"Add product", path:'/admin/add-product',activeProduct:true,formsCSS:true,productCSS:true})
})

Routing.post('/add-product',(req,res,next)=>{
  db.push({title: req.body.title})
  res.redirect('/')
})



exports.routing = Routing
exports.db = db