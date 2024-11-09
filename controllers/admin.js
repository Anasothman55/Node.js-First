import ProductSchema from '../models/product.js'

const getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product',editing:false, isAuthenticated:req.session.isLoggedIn})
}

const postAddProduct = (req,res,next)=>{
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl
  const product = new  ProductSchema({
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
  }).catch(err=>console.log(err))
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
        isAuthenticated:req.session.isLoggedIn
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

  ProductSchema.findById(proId)
    .then(prod=>{
      prod.title = updateTitle
      prod.price = updatePrice
      prod.description= updateDescription
      prod.imageUrl = updateImageUrl
      return prod.save() 
    })
      .then((result)=>{
        console.log("updated")
        res.redirect('/admin/product')
      })
    .catch(err=>{console.log(err)})
}

const deleteProduct = (req,res,next)=>{
  const proId = req.body.id
  ProductSchema.findByIdAndDelete(proId)
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
  ProductSchema.find()
    .then((product)=>{
      console.log(product)
      res.render('./admin/product-list', {data:product, docTitle:"Product",path:'/admin/product',isAuthenticated:req.session.isLoggedIn})
    })
    .catch(err=>{console.log(err)})
}

export {getAddProduct,postAddProduct,getEditProduct,postEditProduct,deleteProduct,getAllProduct}