const { where } = require('sequelize')
const product = require('../models/product.js')

exports.getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product',editing:false})
}

exports.postAddProduct = (req,res,next)=>{
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl
  
  req.user.createProduct({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl
  }).then(result=>{
    //console.log(result)
    console.log("created product")
    res.redirect('/admin/product')
  }).catch(err=>console.log(err))

  // product.create({
  //   title: title,
  //   price: price,
  //   description: description,
  //   imageUrl: imageUrl,
  //   userId: req.user.id
  // }).then(result=>{
  //   //console.log(result)
  //   console.log("created product")
  //   res.redirect('/admin/product')
  // }).catch(err=>console.log(err))
}

exports.putEditProduct= (req,res,next)=>{
  const editMode = req.query.edit 
  if(!editMode){
    return res.redirect('/')
  }
  const proId = parseInt(req.params.id)
  req.user.getProducts({ where: { id: proId } })
  //product.findByPk(proId)
  .then((products)=>{
    const product = products[0]
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

exports.postEditProduct = (req,res,next)=>{
  const proId =  parseInt(req.body.proid)
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl

  product.findByPk(proId)
    .then((product)=>{
      product.title = title
      product.price = price
      product.description = description
      product.imageUrl = imageUrl
      return product.save()
    })
    .then((result)=>{
      console.log("updated")
      res.redirect('/admin/product')
    })
    .catch(err=>{console.log(err)})
}

exports.deleteProduct = (req,res,next)=>{
  const proId = parseInt(req.body.id)
  product.findByPk(proId)
  .then((result)=>{
    return result.destroy() 
  })
  .then(result=>{
    console.log("delted")
    res.redirect('/admin/product')
  })
  .catch(err=>console.log(err))
}

exports.getAllProduct= (req,res,next)=>{
  req.user.getProducts()
  //product.findAll()
    .then((product)=>{
      res.render('./admin/product-list', {data:product, docTitle:"Product",path:'/admin/product'})
    })
}
