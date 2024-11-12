import Order from '../models/order.js'
import ProductSchema from '../models/product.js'
import user from '../models/user.js'
import pdfkit from 'pdfkit'
import fs from 'fs'
import path from 'path'

const getIndex= (req,res,next)=>{
  const loginSuccess = req.flash('loginSuccess')[0]
  ProductSchema.find()
  .then(data=>{
    res.render('./shop/shop', {
      data:data, 
      docTitle:"Product",
      path:'/',
      loginSuccess:loginSuccess,
    })
  })
  .catch(err=>console.log(err))
}

const getProduct = (req,res,next)=>{
  ProductSchema.find()
  .then(data=>{
    res.render('./shop/shop', {data:data, docTitle:"Product",path:'/product'})
  })
  .catch(err=>console.log(err))
}

const getOneProduct = (req,res,next)=>{
  const proId =req.params.id
  ProductSchema.findById(proId)
  .then((data)=>{
    res.render('./shop/product-detail', { data:data,docTitle:"product-detail",path:'/product-detail'})
  })
  .catch(err=>console.log(err))
}

const getCart = (req,res,next)=>{
  req.user.populate('cart.items.productId')
    .then(user=>{
      const cart = user.cart.items
      res.render('./shop/cart', {product:cart, docTitle:"Cart",path:'/cart'})
    })
    .catch(err=>console.log(err))
}

const postToCart = (req,res,next)=>{
  const ids = req.body.productId
  ProductSchema.findById(ids)
    .then((products)=>{
      return req.user.addToCart(products)
    })
      .then((result)=>{
        console.log("urse cart update")
        const referer = req.get('Referer');
        res.redirect(referer); 
      })
    .catch(err=>{console.log(err)})
}

const postDeleteCartItem = (req,res,next)=>{
  const id = req.body.productId
  req.user.deleteItemFormCart(id)
    .then(result=>{
      res.redirect('/cart')
      console.log('delete from cart')
    })
    .catch(err=>{console.log(err)})
}

const getOrder = (req,res,next)=>{
  Order.find({"user.userId": req.user._id})
    .then(orders=>{
      res.render('./shop/orders', {orders:orders, docTitle:"Orders",path:'/orders'})
    })
    .catch(err=>{
      console.log(err)
    })
}

const postOrder = (req,res,next)=>{
  req.user.populate('cart.items.productId')
  .then(user=>{
    const products = user.cart.items.map(i => {
      return {quantity: i.quantity, productData: {...i.productId._doc}}
    })
    const order = new Order({
      user:{
        username: req.user.username,
        userId: req.user
      },
      product: products
    })
    return order.save()
  })
    .then(result=>{
      return req.user.OrderDeleteCart()
    })
    .then(()=>{
      res.redirect('/orders')
    })
    .catch(err=>console.log(err))
}

const getCheckout = (req,res,next)=>{
  res.render('./shop/chekout', { docTitle:"Checkout",path:'/checkout'})
}


export {getIndex, getProduct, getOneProduct, getCart, postToCart,postDeleteCartItem,getOrder,postOrder,getCheckout}