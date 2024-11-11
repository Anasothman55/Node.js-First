import express from 'express';
import { check,body } from 'express-validator';
import * as loginController from '../controllers/auth.js'
import isAuth from '../components/is-auth.js';
import isNotAuth from '../components/is-not-auth.js';
import User from '../models/user.js';


const router = express.Router();

router.get('/login',isAuth, loginController.getlogin)
router.post('/login',isAuth, loginController.postlogin)
router.get('/signup',isAuth, loginController.getSignup);
router.post('/signup',isAuth,
  [
    check('email')
    .isEmail()
    .withMessage('Please enter valide email')
    .custom((value,{req})=>{
      return User.findOne({email: value})
      .then((userDoc)=>{
        if(userDoc){
          return Promise.reject('That user already exist')
        }
      })
    })
    .normalizeEmail()
    ,
    body('password',"please enter password at list 8 character").isLength({min:8}).isAlphanumeric().trim(),
    body('confirmPassword')
    .custom((value, {req})=>{
      if(value !== req.body.password){
        throw new Error('Password have to match')
      }
      return true
    })
  ]
  , 
  loginController.postSignup);
router.post('/logout',isNotAuth, loginController.postlogout)
router.get('/reset', loginController.getReset);
router.post('/reset', loginController.postReset);
router.get('/reset/:token', loginController.getNewPassword);
router.post('/new-password', loginController.postNewPassword);

export default router;
