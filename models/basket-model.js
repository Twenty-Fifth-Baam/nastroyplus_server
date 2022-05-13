const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Basket = sequelize.define("basket", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = {
  Basket,
};
