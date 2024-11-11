import crypto from 'crypto'
import User from "../models/user.js"
import bcryptjs from "bcryptjs"
import nodemailer from 'nodemailer'
import mailgunTransport from 'nodemailer-mailgun-transport';
import bcrypt from 'bcryptjs/dist/bcrypt.js';


const mailgunAuth = {
  auth: {
    api_key: 'e58647a75957a0f5fd738e7d96f78e2c-f6fe91d3-14821a3b', // Please use environment variables!
    domain: 'sandbox967ac7c05a2041f0b3d1dc13140f65f2.mailgun.org'
  }
};

const transport = nodemailer.createTransport(mailgunTransport(mailgunAuth));

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
            res.redirect('/login')
            transport.sendMail({
              to: email,
              from: 'NodeShop <mailgun@sandbox967ac7c05a2041f0b3d1dc13140f65f2.mailgun.org>',
              subject: 'Sign up succeeded',
              html: '<h1>You have successfully signed up!</h1>'
            })
            .then(() => {
              console.log('Email sent successfully');
            })
            .catch(err => {
              console.log("Recipient email:", email);
              console.log("Error:", err);
            });
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

const getReset= (req,res,next)=>{
  const err = req.flash('emailError')[0]
  console.log(err)
  res.render('./auth/reset', { docTitle:"reset",path:'/reset',errorMessage: err})
}
const postReset= (req,res,next)=>{
  const email = req.body.email
  crypto.randomBytes(32, (err,buffer)=>{
    if(err){
      console.log(err)
      return  res.redirect('/reset')
    }
    const token = buffer.toString('hex')
    User.findOne({email: email})
      .then((user)=>{
        if(!user){
          req.flash('emailError',"No account with that email found")
          return res.redirect('/reset')
        }
        user.resetToken = token
        user.resetTokenExpiration = Date.now() + 3600000
        return user.save()
      })
        .then((result)=>{
          res.redirect('/')
          transport.sendMail({
            to: email,
            from: 'NodeShop <mailgun@sandbox967ac7c05a2041f0b3d1dc13140f65f2.mailgun.org>',
            subject: 'password reset',
            html: `
            <p>You request password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set new password </p>
            `
          })
        })
      .catch(err=>{console.log(err)})
  })
}

const getNewPassword= (req,res,next)=>{
  const token = req.params.token
  const err = req.flash('emailError')[0]
  User.findOne({resetToken:token, resetTokenExpiration: {$gt: Date.now()}})
    .then((user)=>{
      res.render('./auth/newPassword', {
        docTitle:"New Password",
        path:'/new-password',
        errorMessage: err,
        userId: user._id.toString(),
        passwordToken:token
      })
    })
    .catch(err=>console.log(err))
}

const postNewPassword= (req,res,next)=>{
  const newPassword = req.body.newPassword
  const userId = req.body.userId
  const  passwordToken = req.body.passwordToken
  let resetUser
  User.findOne({_id:userId,resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}})
  .then(user=>{
    resetUser = user
    return bcrypt.hash(newPassword, 12)
  })
    .then(password=>{
      resetUser.password = password
      resetUser.resetToken = undefined
      resetUser.resetTokenExpiration = undefined
      return resetUser.save()
    })
      .then(result=>{
        res.redirect('/login')
      })
  .catch(err=>{console.log(err)})
}

export {getlogin,postlogin,postlogout,getSignup,postSignup,getReset,postReset,getNewPassword,postNewPassword}