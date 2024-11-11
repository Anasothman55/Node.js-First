import mongoose from "mongoose"
import { Schema } from "mongoose"

const UserSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  resetToken: String,
  resetTokenExpiration: Date,
  password:{
    type: String,
    required: true
  },
  cart:{
    items:[{
      productId:{
        type: Schema.Types.ObjectId,
        ref: 'ProductSchema',
        required: true
      },
      quantity:{
        type: Number,
        required: true
      }
    }]
  }
})

UserSchema.methods.addToCart = function(product){
  const cartProductIndex = this.cart.items.findIndex(cp=>{
    return cp.productId.toString() === product._id.toString()
  })
  let newQuantity= 1;
  const updateCartItems = [...this.cart.items]

  if(cartProductIndex >= 0 ){
    newQuantity = this.cart.items[cartProductIndex].quantity + 1
    updateCartItems[cartProductIndex].quantity = newQuantity
  }else{
    updateCartItems.push({productId: product._id, quantity: newQuantity })
  }
  const updateCart = {items: updateCartItems}
  this.cart = updateCart
  return this.save()
}

UserSchema.methods.deleteItemFormCart = function(proId){
  const updateCartItems = this.cart.items.filter(items=>{
    return items.productId.toString() !== proId.toString()
  })
  this.cart.items = updateCartItems
  return this.save()
}

UserSchema.methods.OrderDeleteCart = function(){
  this.cart = {
    items: []
  }
  return this.save()
}

export default  mongoose.model('User', UserSchema)
// import { getDB } from "../utils/database.js"
// import { ObjectId } from "mongodb"

// class User{
//   constructor(username,email, cart, id){
//     this.username = username
//     this.email = email
//     this.cart = cart
//     this._id = id
//   }

//   save(){
//     const db = getDB()
//     return db.collection('users').insertOne(this)
//       .then((result) => {
//         console.log("user craeted")
//       }).catch((err) => {
//         console.log(err)
//       });
//   }

//   addToCart(product){
//     const db = getDB();
//     const cartProductIndex = this.cart.items.findIndex(cp=>{
//       return cp.productId.toString() === product._id.toString()
//     })
//     let newQuantity= 1;
//     const updateCartItems = [...this.cart.items]
//     if(cartProductIndex >= 0 ){
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updateCartItems[cartProductIndex].quantity = newQuantity
//     }else{
//       updateCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity })
//     }
//     const updateCart = {items: updateCartItems}
//     return db.collection('users').updateOne(
//       {_id: new ObjectId(this._id)},
//       {$set:{  cart: updateCart}}
//     )  
//   }
  
//   getCart(){
//     const db = getDB();
//     const productId = this.cart.items.map(i=>{
//       return i.productId
//     })
//     return db.collection('products')
//       .find({_id: {$in: productId}})
//         .toArray()
//           .then((product) => {
//             return product.map(p=>{
//               return {
//                 ...p, 
//                 quantity: this.cart.items.find(i=>{
//                   return i.productId.toString() === p._id.toString()
//                 }).quantity
//               }
//             })
//           }).catch((err) => {
//             console.log(err)
//           });
//   }

//   deleteItemFormCart(productId){
//     const updateCartItems = this.cart.items.filter(items=>{
//       return items.productId.toString() !== productId.toString()
//     })
//     const db = getDB()
//     return db
//       .collection('users')
//         .updateOne(
//           {_id: new ObjectId(this._id)},
//           {$set: {cart: {items: updateCartItems}}}
//         )
//   }

//   static findById(userId){
//     const db = getDB()
//     return db.collection('users')
//       .findOne({_id: new ObjectId(userId)})
//         .then((user) => {
//           console.log("user")
//           return user
//         }).catch((err) => {
//           console.log(err)
//         });
//   }

//   addOrder(){
//     const db = getDB()
//     return this.getCart()
//       .then(products=>{
//         const order = {
//           items: products,
//           user:{
//             _id: new ObjectId(this._id),
//             username: this.username
//           }
//         }
//         return db.collection('orders').insertOne(order)
//       })
//         .then(result=>{
//           this.cart = {items:[]}
//           return db
//             .collection('users')
//               .updateOne(
//                 {_id: new ObjectId(this._id)},
//                 {$set: {cart: {items: []}}}
//               )
//         })
//         .catch(err=>console.log(err))
//   }
  
//   getOrders(){
//     const db = getDB()
//     return db.collection('orders')
//       .find({
//         'user._id': new ObjectId(this._id)
//       }).toArray()
//   }

// }

