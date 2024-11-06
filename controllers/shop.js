
import Product from '../models/product.js'

const getIndex= (req,res,next)=>{
  Product.fetchAll()
  .then(data=>{
    res.render('./shop/shop', {data:data, docTitle:"Product",path:'/'})
  })
  .catch(err=>console.log(err))
}

const getProduct = (req,res,next)=>{
  Product.fetchAll()
  .then(data=>{
    res.render('./shop/shop', {data:data, docTitle:"Product",path:'/product'})
  })
  .catch(err=>console.log(err))
}

const getOneProduct = (req,res,next)=>{
  const proId =req.params.id
  Product.fetchOne(proId)
  .then((data)=>{
    res.render('./shop/product-detail', { data:data,docTitle:"product-detail",path:'/product-detail'})
  })
  .catch(err=>console.log(err))
}

const getCart = (req,res,next)=>{
  req.user.getCart()
    .then(cart=>{
      res.render('./shop/cart', {product:cart, docTitle:"Cart",path:'/cart'})
    })
    .catch(err=>console.log(err))
}

const postToCart = (req,res,next)=>{
  const ids = req.body.productId
  Product.fetchOne(ids)
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
  req.user.getOrders()
    .then(orders=>{
      res.render('./shop/orders', {orders:orders, docTitle:"Orders",path:'/orders'})
    })
    .catch(err=>console.log(err))
}

const postOrder = (req,res,next)=>{
  req.user.addOrder()
    .then(fetch=>{
      res.redirect('/orders')
    })
    .catch(err=>console.log(err))
}

const getCheckout = (req,res,next)=>{
  res.render('./shop/chekout', { docTitle:"Checkout",path:'/checkout'})
}

export {getIndex, getProduct, getOneProduct, getCart, postToCart,postDeleteCartItem,getOrder,postOrder,getCheckout}