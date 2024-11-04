
const express = require('express')
const bodyuParser = require('body-parser')
const path = require('path')

const sequelize = require('./utils/database.js')
const Product =  require('./models/product.js')
const User = require('./models/user.js')
const Cart = require('./models/cart.js')
const CartItem = require('./models/cart-item.js')
const Order = require('./models/order.js')
const OrderItem = require('./models/orderItem.js')

const app = express();

app.set('view engine', 'ejs')
app.set('views', 'views');

const adminRouts = require('./routes/admin.js')
const userRouts = require('./routes/shop.js')
const get404 = require('./controllers/404.js');
const { symlink } = require('fs');

app.use(bodyuParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
  User.findByPk(1)
    .then(user=>{
      req.user = user
      next()
    })
    .catch(err=>{console.log(err)})
})

app.use('/admin', adminRouts.routing)
app.use(userRouts)
app.use(get404.get404)

User.hasMany(Product, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Product.belongsTo(User, {
  foreignKey: 'userId',
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});


User.hasOne(Cart, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Cart.belongsTo(User,{
  foreignKey: 'userId', 
  constraints:true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})



Cart.belongsToMany(Product,{
  through: CartItem
})
Product.belongsToMany(Cart,{
  through: CartItem
})

User.hasMany(Order, {
  foreignKey: 'userId', 
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Order.belongsTo(User,{
  foreignKey: 'userId', 
  constraints:true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

Order.belongsToMany(Product,{
  through: OrderItem
})

// force:true it use for devolopment 
sequelize.sync()
  .then(result=>{
    return User.findByPk(1)
  })
    .then(user=>{
      if(!user){
        return  User.create({username:'AnasAS',email:'anasothman@gmail.com'})
      }
      return user
    })
      .then(user=>{
        // run one time
        //return user.createCart()
        return "true"
      })
        .then((cart)=>{
          app.listen(3000);
        })
  .catch(err=>console.log(err))
