const sequelize = require("../database/Db");
const { DataTypes } = require("sequelize");
const product  = require("./Product");

const rating = sequelize.define("ratings", {
  rateId:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  rate: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  comment: {
    type: DataTypes.STRING,
  },
  productId:
  {
    type: DataTypes.INTEGER,
    references: {
      model: product, 
      key: 'productId'
    }
    ,
    allowNull:false
  }
});
product.hasMany(rating, {
  foreignKey: "productId"
});

rating.belongsTo(product, {
  foreignKey: "productId"
});

module.exports = rating;
