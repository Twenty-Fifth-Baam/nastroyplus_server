const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Favorite = sequelize.define("favorite", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
});

module.exports = {
  Favorite,
};
