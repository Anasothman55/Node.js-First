import { BOOLEAN } from "sequelize"
import User from "../models/user.js"


const getlogin= (req,res,next)=>{
  res.render('./auth/login', { docTitle:"login",path:'/login',isAuthenticated: false })
}

const postlogin= (req,res,next)=>{
  User.findById('672c5f92664ce2103acf6664')
  .then(user=>{
    req.session.isLoggedIn= true
    req.session.user = user
    req.session.save((err)=>{
      console.log(err)
      res.redirect('/')
    })
  })
  .catch(err=>{console.log(err)})
}

const postlogout=(req,res,next)=>{
  req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/')
  })
}

export {getlogin,postlogin,postlogout}