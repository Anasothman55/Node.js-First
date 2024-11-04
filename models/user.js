const {Sequelize,DataTypes, Model} = require('sequelize');
const sequelize = require('../utils/database')

const User = sequelize.define(
  'users',
  {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }
)

module.exports = User