import csrf from 'csurf';
import flash from 'connect-flash';
import express from 'express'
import session from 'express-session';
import connectMongodbSession from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from './models/user.js'
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongouri = 'mongodb://localhost:27017/Shop'

const app = express();
const MongoDBStore = connectMongodbSession(session);
const store = new MongoDBStore({
  uri: mongouri,
  collection: 'sessions'
});

const csrfProtection = csrf()

const fileStorage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null, 'images')
  },
  filename: (req,file,cb)=>{
    const ran= Math.floor(Math.random() * 1000000000)
    const imageNmae = `${ran}-${file.originalname}`
    console.log(imageNmae)
    cb(null, imageNmae.toString())
  }
})

const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
    cb(null, true)
  }else{
    cb(null, false)
  }
}

app.set('view engine', 'ejs')
app.set('views', 'views');

import adminRoutes from './routes/admin.js';
import userRouts from './routes/shop.js'
import authRouts from './routes/auth.js'
import * as errorRouts from './controllers/404.js'

app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({storage: fileStorage,fileFilter: fileFilter }).single('image'))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(session({
  secret:'mySecret',
  resave: false,
  saveUninitialized: false,
  store: store
}))

app.use(csrfProtection)

app.use(flash())
app.use((req,res,next)=>{
  res.locals.isAuthenticated = req.session.isLoggedIn
  res.locals.csrfToken = req.csrfToken()
  next()
})

app.use((req,res,next)=>{
  if(!req.session.user){
    return next()
  }
  User.findById(req.session.user._id)
    .then(user=>{
      if(!user){
        return next()
      }
      req.user = user
      next()
    })
    .catch(err=>{
      next(new Error(err))
    })
})



app.use('/admin', adminRoutes)
app.use(userRouts)
app.use(authRouts)
app.get('/500',errorRouts.get500)
app.use(errorRouts.get404)

app.use((error, req, res, next)=>{
  res.redirect('/500')
})

mongoose.connect(mongouri)
  .then(result=>{
    app.listen(3000)
  })
  .catch(err=>{console.log(err)})