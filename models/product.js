const {Sequelize,DataTypes, Model} = require('sequelize');
const sequelize = require('../utils/database')

const Product = sequelize.define(
  'product',
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull:false,
      primaryKey:true,
    },
    title:DataTypes.STRING,
    price:{
      type: DataTypes.DOUBLE,
      allowNullL:  false
    },
    imageUrl:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type:DataTypes.TEXT,
      allowNull: false
    }
  }
)

module.exports = Product;
