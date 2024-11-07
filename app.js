
import express from 'express'
import bodyParser from 'body-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import User from './models/user.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');

import adminRoutes from './routes/admin.js';
import userRouts from './routes/shop.js'
import get404 from './controllers/404.js'


app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findById("672c5f92664ce2103acf6664")
    .then(user=>{
      req.user = user
      next()
    })
    .catch(err=>{console.log(err)})
})

app.use('/admin', adminRoutes)
app.use(userRouts)
app.use(get404)

mongoose.connect('mongodb://localhost:27017/Shop')
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