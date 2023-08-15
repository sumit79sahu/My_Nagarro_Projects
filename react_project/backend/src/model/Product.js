const sequelize = require("../database/Db");
const { DataTypes } = require("sequelize");
const category = require("./Category");

const product = sequelize.define("products", {
  productId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  categoryId:
  {
    type: DataTypes.INTEGER,
    references: {
      model: category, 
      key: 'categoryId'
    },
    allowNull:false
  },
  productTitle: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  productImage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  productPrice: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});

category.hasMany(product,{ foreignKey: "categoryId" });
product.belongsTo(category,{ foreignKey: "categoryId" })

module.exports = product;
