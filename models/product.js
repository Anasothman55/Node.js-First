const fs = require('fs');
const path = require('path');

module.exports = class {
  constructor(title) {
    this.title = title;
  }
  save() {
    const p = path.join(__dirname, '..', 'data', 'product.json');
    fs.readFile(p, (err, fileContent) => {
      let products = [];
      if (!err) {
        try {
          products = JSON.parse(fileContent);
        } catch (parseErr) {
          console.log('Failed to parse JSON:', parseErr);
        }
      }
      products.push(this);
      fs.mkdir(path.join(__dirname, '..', 'data'), { recursive: true }, (mkdirErr) => {
        if (mkdirErr) {
          return console.log('Failed to create data folder:', mkdirErr);
        }
        fs.writeFile(p, JSON.stringify(products), (writeErr) => {
          if (writeErr) {
            console.log('Failed to save product:', writeErr);
          }
        });
      });
    });
  }
  static fetchAll(cb) {
    const p = path.join(__dirname, '..', 'data', 'product.json');
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        return cb([]);
      }
      try {
        cb(JSON.parse(fileContent));
      } catch (parseErr) {
        console.log('Failed to parse JSON:', parseErr);
        cb([]);
      }
    });
  }
};
