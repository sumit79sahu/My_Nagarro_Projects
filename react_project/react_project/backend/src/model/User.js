const sequelize = require("../database/Db");
const { DataTypes } = require("sequelize");


const user = sequelize.define("users", {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userName:{
    type:DataTypes.STRING,
    allowNull:false
  },
  userEmail:{
    type:DataTypes.STRING,
    allowNull:false
  },
  userMobileNo:{
    type:DataTypes.STRING,
  },
  userGender:
  {
    type:DataTypes.STRING
  },
  isVerified:
  {
    type:DataTypes.BOOLEAN,
    defaultValue:false
  }
},{
  timestamps: false
});

module.exports = user;
