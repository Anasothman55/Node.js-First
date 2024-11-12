import ProductSchema from '../models/product.js'
import { validationResult } from 'express-validator';
import { ObjectId } from 'mongodb';

const getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product',errorMessage:[],editing:false,hasError: null,product:{
    title:"",
    price:"",
    description:"",
    imageUrl:""
  },})
}

const postAddProduct = (req,res,next)=>{
  console.log("hace") 
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const image = req.file
  
  if(!image){
    
    return res.status(422).render('./admin/add-product', 
      {
        docTitle:"Add product", 
        path:'/admin/add-product',
        product:{
          title:title,
          price:price,
          description:description,
        },
        editing: false,
        hasError: true,
        errorMessage: ["atteched file is not an image"]
      })   
  }
  
  const imageUrl = image.path

  const error  = validationResult(req)
  if(!error.isEmpty()){
    return res.status(422).render('./admin/add-product', 
      {
        docTitle:"Add product", 
        path:'/admin/add-product',
        product:{
          title:title,
          price:price,
          description:description,
          imageUrl:imageUrl
        },
        editing: false,
        hasError: true,
        errorMessage: error.array()
      })
  }
  const product = new  ProductSchema({
    //_id: new ObjectId('672c61abc1228ea3af18852d'),
    title:title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId: req.user
  })
  product.save()
  .then(result=>{
    //console.log(result)
    console.log("created product")
    res.redirect('/admin/product')
  }).catch(err=>{
    //res.redirect('/500')
    //console.log(err)
    const error = new Error(err)
    error.httpStatusCode = 500
    return next(error)
  })
}

const getEditProduct= (req,res,next)=>{
  const editMode = req.query.edit 
  if(!editMode){
    return res.redirect('/')
  }
  const proId = req.params.id
  ProductSchema.findById(proId)
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
        editing: Boolean(editMode),
        hasError: null,
        errorMessage: []
      }
    )
  })
  .catch(err=>console.log(err))
}

const postEditProduct = (req,res,next)=>{
  const editMode = req.query.edit 
  const proId =  req.body.proid
  const updateTitle = req.body.title
  const updatePrice = req.body.price
  const updateDescription = req.body.description
  const updateImageUrl = req.body.imageUrl
  
  const error  = validationResult(req)
  if(!error.isEmpty()){
    return res.status(422).render('./admin/add-product', 
      {
        docTitle:"Edit product", 
        path:'/admin/edit-product',
        product:{
          title:updateTitle,
          price:updatePrice,
          description:updateDescription,
          imageUrl:updateImageUrl,
          _id: proId
        },
        editing: Boolean(editMode),
        hasError: true,
        errorMessage: error.array()
      })
  }

  ProductSchema.findById(proId)
    .then(prod=>{
      if(prod.userId.toString() !== req.user._id.toString()){
        console.log(req.user._id)
        console.log(prod.userId)
        return res.redirect('/')
      }
      prod.title = updateTitle
      prod.price = updatePrice
      prod.description= updateDescription
      prod.imageUrl = updateImageUrl
      return prod.save().then((result)=>{
        console.log("updated")
        res.redirect('/admin/product')
      })
    })
    .catch(err=>{console.log(err)})
}

const deleteProduct = (req,res,next)=>{
  const proId = req.body.id
  ProductSchema.deleteOne({_id: proId, userId: req.user._id})
    .then(result=>{
      if (result) {
        console.log("Product deleted successfully");
      } else {
        console.log("Product not found");
        res.status(404).send("Product not found");
      }
      console.log("delted")
      res.redirect('/admin/product')
    })
    .catch(err=>{
      console.log(err)
      res.status(500).send("Server error");
    })
}

const getAllProduct= (req,res,next)=>{
  ProductSchema.find({userId: req.user._id})
    .then((product)=>{
      console.log(product)
      res.render('./admin/product-list', {data:product, docTitle:"Product",path:'/admin/product'})
    })
    .catch(err=>{console.log(err)})
}

export {getAddProduct,postAddProduct,getEditProduct,postEditProduct,deleteProduct,getAllProduct}