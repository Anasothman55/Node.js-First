
import express from 'express'
import session from 'express-session';
import connectMongodbSession from 'connect-mongodb-session';
import bodyParser from 'body-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from './models/user.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongouri = 'mongodb://localhost:27017/Shop'

const app = express();
const MongoDBStore = connectMongodbSession(session);
const store = new MongoDBStore({
  uri: mongouri,
  collection: 'sessions'
});



app.set('view engine', 'ejs')
app.set('views', 'views');

import adminRoutes from './routes/admin.js';
import userRouts from './routes/shop.js'
import authRouts from './routes/auth.js'
import get404 from './controllers/404.js'


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:'mySecret',
  resave: false,
  saveUninitialized: false,
  store: store
}))
app.use((req,res,next)=>{
  if(!req.session.user){
    return next()
  }
  User.findById(req.session.user._id)
    .then(user=>{
      req.user = user
      next()
    })
    .catch(err=>{console.log(err)})
})

app.use('/admin', adminRoutes)
app.use(userRouts)
app.use(authRouts)
app.use(get404)

mongoose.connect(mongouri)
  .then(result=>{
    app.listen(3000)
    User.findOne()
      .then(user=>{
        if(!user){
          const user = new User({
            username: 'AnasAS',
            email: 'anasothman23@gmail.com',
            cart:{
              items: []
            }
          })
          user.save()
        }
      })
    
  })
  .catch(err=>{console.log(err)})