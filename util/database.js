const Sequelize = require('sequelize');


const sequelize = new Sequelize('expensetracker','mahibaby','uitIT%1822',{
    dialect: 'mysql',
    host: 'database-1.ck4vugbeanlm.eu-north-1.rds.amazonaws.com'
    
   })


// Rest of your Sequelize setup and model definitions go here

module.exports = sequelize;

    

  
