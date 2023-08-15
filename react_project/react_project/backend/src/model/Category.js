const sequelize = require("../database/Db");
const { DataTypes } = require("sequelize");

const category = sequelize.define("categories", {
  categoryId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryImage: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});



module.exports = category;