//const http = require('http');
//const routes = require('./routesfile.js')
//const server = http.createServer(routes.handler)
//server.listen(3000);


const express = require('express')
const bodyuParser = require('body-parser')
const path = require('path')

const app = express();

const adminRouts = require('./routes/admin.js')
const  userRouts = require('./routes/shop.js')



app.use(bodyuParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin',adminRouts)
app.use(userRouts)

app.use((req,res,next)=>{
  res.status(404).sendFile(path.join(__dirname,'./','views','404page.html'))
})


app.listen(3000);