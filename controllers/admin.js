const db = require('../models/product.js')

exports.getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product'})
}

exports.postAddProduct = (req,res,next)=>{
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl

  const dbs = new db(title,imageUrl,description,price)
  dbs.save()
  res.redirect('/')
}

exports.getAllProduct= (req,res,next)=>{
  db.fetchAll((data)=>{
    res.render('./admin/product-list', {data:data, docTitle:"Product",path:'/product'})
  })
}
