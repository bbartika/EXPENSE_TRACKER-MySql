const Sequelize = require('sequelize')



const sequelize = new Sequelize('expense-tracker', 'root', 'uitIT$1822',{
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;
