const express = require('express')
const path = require('path')
const Routing = express.Router() 

const adminData = require('./admin.js')

const rootDir = require('../utils/path')



Routing.get('/',(req,res,next)=>{
  //res.sendFile(path.join(rootDir, 'views', 'myShop.html'))
  const data = adminData.db
  res.render('shop', {data:data, docTitle:"Shop",path:'/',activeShop:true,productCSS:true,hasProducts: data.length>0})


})

module.exports = Routing