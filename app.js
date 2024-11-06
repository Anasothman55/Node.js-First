
import express from 'express'
import bodyParser from 'body-parser';
import path from 'path'
import { fileURLToPath } from 'url';
import {mongoConnect } from './utils/database.js'
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
  User.findById("672b8f52c140acddc9d196ff")
    .then(user=>{
      req.user = new User(user.username,user.email,user.cart, user._id)
      next()
    })
    .catch(err=>{console.log(err)})
})

app.use('/admin', adminRoutes)
app.use(userRouts)
app.use(get404)

mongoConnect(()=>{
  console.log("connect")
  app.listen(3000)
})