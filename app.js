//const http = require('http');
//const routes = require('./routesfile.js')
//const server = http.createServer(routes.handler)
//server.listen(3000);


const express = require('express')
const bodyuParser = require('body-parser')
const path = require('path')

const app = express();


app.set('view engine', 'ejs')
app.set('views', 'views');

const adminRouts = require('./routes/admin.js')
const  userRouts = require('./routes/shop.js')
const get404 = require('./controllers/404.js')


app.use(bodyuParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouts.routing)
app.use(userRouts)

app.use(get404.get404)


app.listen(3000);