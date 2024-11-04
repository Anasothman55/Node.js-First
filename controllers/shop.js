const { where } = require('sequelize')
const Cartdb = require('../models/cart.js')
const Product = require('../models/product.js')



exports.getIndex= (req,res,next)=>{
  Product.findAll()
  .then(data=>{
    res.render('./shop/shop', {data:data, docTitle:"Product",path:'/'})
  })
  .catch(err=>console.log(err))
}

exports.getProduct = (req,res,next)=>{
  Product.findAll()
  .then(data=>{
    res.render('./shop/shop', {data:data, docTitle:"Product",path:'/product'})
  })
  .catch(err=>console.log(err))
}

exports.getOneProduct = (req,res,next)=>{
  const proId = parseInt(req.params.id)
  
  Product.findAll({where:{id:proId}})
  .then((data)=>{
    res.render('./shop/product-detail', { data:data[0],docTitle:"product-detail",path:'/product-detail'})
  })
  .catch(err=>console.log(err))

  // product.findByPk(proId)
  //   .then((data)=>{
  //     res.render('./shop/product-detail', { data:data,docTitle:"product-detail",path:'/product-detail'})
  //   })
  //   .catch(err=>console.log(err))
}

exports.getCart = (req,res,next)=>{
  req.user.getCart()
    .then(cart=>{
      return cart.getProducts()
        .then(product=>{
          //console.log(product[0])
          res.render('./shop/cart', {product:product, docTitle:"Cart",path:'/cart'})
        })
        .catch(err=>console.log(err))
    })
    .catch(err=>console.log(err))
}

exports.postToCart = (req,res,next)=>{
  const ids = parseInt(req.body.productId)
  let featchCart
  let newQuantity = 1
  req.user.getCart()
    .then(cart=>{
      featchCart = cart
      return cart.getProducts({where: {id:ids}})
    })
      .then(products=>{
        let product;
        if(products.length>0){
          product =  products[0]
        }
        if (product) {
          const oldQuantity = product.cartItem.quantity;
          newQuantity = oldQuantity + 1;
          return product;
        }
        return Product.findByPk(ids)
      })
        .then(product=>{
          return featchCart.addProduct(product, {
            through: { quantity: newQuantity }
          });
        })
          .then(()=>{
            res.redirect(req.get('referer'));
          })
    .catch(err=>console.log(err))
}

exports.postDeleteCartItem = (req,res,next)=>{
  const id = parseInt(req.body.productId)
  req.user.getCart()
    .then(cart=>{
      return cart.getProducts({where:{id:id}})
    })
      .then(products=>{
        const product = products[0]
        return product.cartItem.destroy();
      })
        .then(result=>{
          res.redirect('/cart')
        })
    .catch(err=>{console.log(err)})
}

exports.getOrder = (req,res,next)=>{
  req.user.getOrders({include: ['products']})
    .then(orders=>{
      res.render('./shop/orders', {orders:orders, docTitle:"Orders",path:'/orders'})
    })
    .catch(err=>console.log(err))
}

exports.postOrder = (req,res,next)=>{
  let fetchCart;
  req.user.getCart()
    .then((cart)=>{
      fetchCart = cart;
      return cart.getProducts()
    })
      .then(products=>{
        return req.user.createOrder()
          .then(order=>{
            return  order.addProducts(products.map(prod=>{
              prod.orderItem = { quantity: prod.cartItem.quantity }
              return prod
            })) 
          })
          .catch(err=>console.log(err))
      })
        .then((result)=>{
          return  fetchCart.setProducts(null)
        })
          .then(fetch=>{
            res.redirect('/orders')
          })
    .catch(err=>console.log(err))
}


exports.getCheckout = (req,res,next)=>{
  res.render('./shop/chekout', { docTitle:"Checkout",path:'/checkout'})
}
