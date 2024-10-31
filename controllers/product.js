const db = require('../models/product.js')

exports.getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product'})
}

exports.postAddProduct = (req,res,next)=>{
  const dbs = new db( req.body.title)
  dbs.save()
  res.redirect('/')
}

exports.getProduct = (req,res,next)=>{
  db.fetchAll((data)=>{
    res.render('./shop/shop', {data:data, docTitle:"Shop",path:'/'})
  })
}
