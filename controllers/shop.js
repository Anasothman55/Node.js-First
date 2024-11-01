const db = require('../models/product.js')

exports.getIndex= (req,res,next)=>{
  db.fetchAll((data)=>{
    res.render('./shop/index', {data:data, docTitle:"Shopfiy",path:'/'})
  })
}

exports.getProduct = (req,res,next)=>{
  db.fetchAll((data)=>{
    res.render('./shop/shop', {data:data, docTitle:"Product",path:'/product'})
  })
}

exports.getCart = (req,res,next)=>{
  res.render('./shop/cart', { docTitle:"Cart",path:'/cart'})
}

exports.getOrder = (req,res,next)=>{
  res.render('./shop/orders', { docTitle:"Orders",path:'/orders'})
}


exports.getCheckout = (req,res,next)=>{
  res.render('./shop/chekout', { docTitle:"Checkout",path:'/checkout'})
}

