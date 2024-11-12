const get404 = (req,res,next)=>{
  res.status(404).render('404', {docTitle:"404",path: req.url,isAuthenticated:req.isLoggedIn})
}

const get500 = (req,res,next)=>{
  res.status(404).render('500', {docTitle:"500",path: req.url,isAuthenticated:req.isLoggedIn})
}


export {get404,get500}