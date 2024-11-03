
const db = require('../utils/database')

module.exports = class {
  constructor(id,title,imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }
  save() {
    const query = `INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)`;
    const values = [this.title, this.price, this.description, this.imageUrl];
    return db.execute(query, values)
  }
  static delete(proId){
    return db.execute(`DELETE FROM products WHERE id = ?`,[proId])
  }
  static fetchAll() {
    return db.execute("SELECT * FROM products")
  }
  static findById(proId){
    return db.execute("SELECT * FROM products WHERE id = ?",[proId])
  }
};
