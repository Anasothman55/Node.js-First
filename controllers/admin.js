const db = require('../models/product.js')

exports.getAddProduct= (req,res,next)=>{
  res.render('./admin/add-product', {docTitle:"Add product", path:'/admin/add-product',editing:false})
}

exports.postAddProduct = (req,res,next)=>{
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl

  const dbs = new db(null,title,imageUrl,description,price)
  dbs.save()
  res.redirect('/admin/product')
}

exports.putEditProduct= (req,res,next)=>{
  const editMode = req.query.edit 
  if(!editMode){
    return res.redirect('/')
  }
  const proId = parseInt(req.params.id)
  db.fideById(proId, product=>{
    if(!product){
      return res.redirect('/')
    }

    res.render('./admin/add-product', 
      {docTitle:"Edit product", 
      path:'/admin/edit-product',
      product:product,
      editing: Boolean(editMode)
    })
  })
}

exports.postEditProduct = (req,res,next)=>{
  const proId =  parseInt(req.body.proid)
  const title = req.body.title
  const price = req.body.price
  const description = req.body.description
  const imageUrl = req.body.imageUrl

  const updatedbs = new db(proId,title,imageUrl,description,price)
  updatedbs.save()
  res.redirect('/admin/product')
}

exports.deleteProduct = (req,res,next)=>{
  const proId = parseInt(req.body.id)
  db.delete(proId)
  res.redirect('/admin/product')
}

exports.getAllProduct= (req,res,next)=>{
  db.fetchAll((data)=>{
    res.render('./admin/product-list', {data:data, docTitle:"Product",path:'/admin/product'})
  })
}
