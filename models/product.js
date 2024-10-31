const fs = require('fs');
const path = require('path');

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
  constructor(title) {
    this.title = title;
  }
  save() {
    getHelperFunction(product =>{
      product.push(this)
      fs.writeFile(p, JSON.stringify(product), (writeErr) => {
        if (writeErr) {
          console.log('Failed to save product:', writeErr);
        }
      });
    })
  }
  static fetchAll(cb) {
    getHelperFunction(cb)
  }
};
