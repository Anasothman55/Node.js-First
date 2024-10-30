//const http = require('http');
//const routes = require('./routesfile.js')
//const server = http.createServer(routes.handler)
//server.listen(3000);


const express = require('express')
const bodyuParser = require('body-parser')
const path = require('path')
const expressHbs = require('express-handlebars')

const app = express();

//app.set('view engine', 'pug')


app.engine('hbs', expressHbs.engine({ extname: 'hbs', layoutsDir: 'views/layouts',defaultLayout:'main' }))
app.set('view engine', 'hbs')


app.set('views', 'views');

const adminRouts = require('./routes/admin.js')
const  userRouts = require('./routes/shop.js')



app.use(bodyuParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouts.routing)
app.use(userRouts)

app.use((req,res,next)=>{
  res.status(404).render('404', {docTitle:"404"})
})


app.listen(3000);