const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  role:{
    type: DataTypes.STRING,
    defaultValue: "USER",
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
