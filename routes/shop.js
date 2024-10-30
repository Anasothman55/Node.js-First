const express = require('express')
const path = require('path')
const Routing = express.Router() 

const adminData = require('./admin.js')

const rootDir = require('../utils/path')



Routing.get('/',(req,res,next)=>{
  console.log("In the middlware 2")
  console.log(adminData.db)
  res.sendFile(path.join(rootDir, 'views', 'myShop.html'))
})

module.exports = Routing