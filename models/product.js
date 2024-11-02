const fs = require('fs');
const path = require('path');

const Cart = require('./cart')
const p = path.join(__dirname, '..', 'data', 'product.json');

const getHelperFunction = cb =>{
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([]);
    }else{
      cb(JSON.parse(fileContent));
    }
  });
}
module.exports = class {
  constructor(id,title,imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }
  save() {
    getHelperFunction(product =>{
      if(this.id){
        const existingProductIndex = product.findIndex(p =>  p.id === this.id);
        const updateProduct = [...product]
        updateProduct[existingProductIndex] = this
        fs.writeFile(p, JSON.stringify(updateProduct), (writeErr) => {
          console.log(writeErr)
        });
      }else{
        this.id = Math.floor(Math.random() * 1000000000 + 1)
        product.push(this)
        fs.writeFile(p, JSON.stringify(product), (writeErr) => {
          if (writeErr) {
            console.log('Failed to save product:', writeErr);
          }
        });
      }
    })
  }
  static delete(id){
    getHelperFunction(products=>{
      const product = products.find(pro => pro.id === id)
      const productFiltter = products.filter(prod => prod.id !== id)
      fs.writeFile(p, JSON.stringify(productFiltter), (writeErr) => {
        if (!writeErr) {
          Cart.deleteProduct(id,product.price)
        }
      });
    })
  }
  static fetchAll(cb) {
    getHelperFunction(cb)
  }
  static fideById(id,cd){
    getHelperFunction(products=>{
      const product = products.find(p => p.id === id)
      cd(product)
    });
  }
};
