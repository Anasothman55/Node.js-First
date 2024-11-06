//const product = require('../models/product.js')
import Product from '../models/product.js'

const getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product',editing:false})
}

const postAddProduct = (req,res,next)=>{
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl
  const product = new  Product(title,price,description,imageUrl,null,req.user._id)
  product.save()
  .then(result=>{
    //console.log(result)
    console.log("created product")
    res.redirect('/admin/product')
  }).catch(err=>console.log(err))
}

const getEditProduct= (req,res,next)=>{
  const editMode = req.query.edit 
  if(!editMode){
    return res.redirect('/')
  }
  const proId = req.params.id
  Product.fetchOne(proId)
  .then((products)=>{
    const product = products
    if(!product){
      return res.redirect('/')
    }
    res.render('./admin/add-product', 
      {
        docTitle:"Edit product", 
        path:'/admin/edit-product',
        product:product,
        editing: Boolean(editMode)
      }
    )
  })
  .catch(err=>console.log(err))
}

const postEditProduct = (req,res,next)=>{
  const proId =  req.body.proid
  const updateTitle = req.body.title
  const updatePrice = req.body.price
  const updateDescription = req.body.description
  const updateImageUrl = req.body.imageUrl

  const product = new Product(updateTitle,updatePrice,updateDescription,updateImageUrl,proId)
  product.save()
    .then((result)=>{
      console.log("updated")
      res.redirect('/admin/product')
    })
    .catch(err=>{console.log(err)})
}

const deleteProduct = (req,res,next)=>{
  const proId = req.body.id
  Product.deleteById(proId)
  .then(result=>{
    console.log("delted")
    res.redirect('/admin/product')
  })
  .catch(err=>console.log(err))
}

const getAllProduct= (req,res,next)=>{
  Product.fetchAll()
    .then((product)=>{
      res.render('./admin/product-list', {data:product, docTitle:"Product",path:'/admin/product'})
    })
    .catch(err=>{console.log(err)})
}

export {getAddProduct,postAddProduct,getEditProduct,postEditProduct,deleteProduct,getAllProduct}