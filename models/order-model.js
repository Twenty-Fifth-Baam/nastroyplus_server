const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Order = sequelize.define("order", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(19, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "В обработке",
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    phone: {
        type: DataTypes.TEXT,
        allowNull: false,
    }
});

const OrderProduct = sequelize.define("orderProduct", {
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
    Order,
    OrderProduct,
};
