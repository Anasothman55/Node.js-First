const db = require('../models/product.js')
const Cartdb = require('../models/cart.js')

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

exports.getOneProduct = (req,res,next)=>{
  const proId = parseInt(req.params.id)
  db.fideById(proId, product=>{
    res.render('./shop/product-detail', { data:product,docTitle:"product-detail",path:'/product-detail'})
  })
}

exports.getCart = (req,res,next)=>{
  Cartdb.fetchAll(cart =>{
    db.fetchAll(products =>{
      const cartProduct = []
      for(let product of products){
        const cartProductItem = cart.products.find(pro => pro.id ===  product.id)
        if(cartProductItem){
          cartProduct.push({productData:product, qty:cartProductItem.qty})
        }
      }
      res.render('./shop/cart', {product:cartProduct, docTitle:"Cart",path:'/cart'})
    })
  })
}

exports.postToCart = (req,res,next)=>{
  const id = parseInt(req.body.productId)
  db.fideById(id, (product)=>{
    Cartdb.addProduct(id, parseFloat(product.price))
  })

  res.redirect(req.get('referer'));
}

exports.postDeleteCartItem = (req,res,next)=>{
  const id = parseInt(req.body.productId)
  db.fideById(id, product =>{
    Cartdb.deleteProduct(id, product.price)
    res.redirect('/cart')
  })
}

exports.getOrder = (req,res,next)=>{
  res.render('./shop/orders', { docTitle:"Orders",path:'/orders'})
}


exports.getCheckout = (req,res,next)=>{
  res.render('./shop/chekout', { docTitle:"Checkout",path:'/checkout'})
}
