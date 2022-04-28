const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Token = sequelize.define("token", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

module.exports = Token;
