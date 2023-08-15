const {Sequelize}=require('sequelize')

const sequelize = new Sequelize('Ecommerce', 'root', 'Sumit@123', {
    host: 'localhost',
    dialect:'mysql'
  });
module.exports=sequelize;