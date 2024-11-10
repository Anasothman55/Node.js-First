import { BOOLEAN } from "sequelize"
import User from "../models/user.js"
import bcryptjs from "bcryptjs"

const getlogin= (req,res,next)=>{
  const err = req.flash('emailError')[0]
  console.log(err)
  res.render('./auth/login', { docTitle:"login",path:'/login',errorMessage: err})
}

const postlogin= (req,res,next)=>{
  const email = req.body.email
  const password = req.body.password
  User.findOne({email: email})
  .then(user=>{
    if(!user){
      req.flash('emailError',"Invalide email ")
      return res.redirect('/login')
    }
    bcryptjs.compare(password, user.password)
      .then((doMatch)=>{
        if(doMatch){
          req.session.isLoggedIn= true
          req.session.user = user
          return req.session.save((err)=>{
            console.log(err)
            req.flash('loginSuccess',`Welcome back ${user.username}`)
            res.redirect('/')
          })
        }
        req.flash('emailError',"wrong password")
        return res.redirect('/login')
      })
      .catch(err=>{
        console.log(err)
        return res.redirect('/login')
      })
  })
  .catch(err=>{console.log(err)})
}

const getSignup = (req,res,next)=>{
  const err = req.flash('emailError')[0]
  res.render('auth/signUp', {
    path: '/signup',
    docTitle: 'Signup',
    isAuthenticated: false,
    errorMessage: err
  });
}

const postSignup = (req,res,next)=>{
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const username = email.split('@')[0]
  User.findOne({email: email})
    .then((userDoc)=>{
      if(userDoc){
        req.flash('emailError',"that user already exist")
        return res.redirect('/signup')
      }
      return bcryptjs.hash(password, 12)
        .then(hashPassword=>{
          const user = new User({
            email: email,
            username: username,
            password: hashPassword,
            cart: {items: []}
          });
          return user.save()
        })
          .then(()=>{
            console.log("new user sign up")
            res.redirect('/login')
          })
    })
    .catch(err=>console.log(err))
}

const postlogout=(req,res,next)=>{
  req.session.destroy((err)=>{
    console.log(err)
    res.redirect('/')
  })
}

export {getlogin,postlogin,postlogout,getSignup,postSignup}