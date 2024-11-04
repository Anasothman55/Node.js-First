const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(
  'node-complete',
  'root',
  'devolopserver',
  {
    dialect:'mysql', 
    host:'localhost'
  }
)

module.exports = sequelize;