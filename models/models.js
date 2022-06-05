const User = require("./user-model");
const Token = require("./token-model");
const {
    Product,
    Category,
    Subcategory,
    Attribute,
} = require("./product-model");
const {Favorite} = require("./favorite-model");
const {Basket} = require("./basket-model");
const {Order, OrderProduct} = require("./order-model");

User.hasOne(Token, {
    onDelete: 'CASCADE',
});
Token.belongsTo(User);

Category.hasMany(Subcategory, {
    onDelete: 'CASCADE',
});
Subcategory.belongsTo(Category);

Subcategory.hasMany(Product, {
    onDelete: 'CASCADE',
});
Product.belongsTo(Subcategory);

Product.hasMany(Attribute, {
    onDelete: 'CASCADE',
});
Attribute.belongsTo(Product);

User.hasMany(Favorite, {
    onDelete: 'CASCADE',
});
Favorite.belongsTo(User);

Product.hasMany(Favorite, {
    onDelete: 'CASCADE',
});
Favorite.belongsTo(Product);


User.hasMany(Basket, {
    onDelete: 'CASCADE',
});
Basket.belongsTo(User);

Product.hasMany(Basket, {
    onDelete: 'CASCADE',
});
Basket.belongsTo(Product);

User.hasMany(Order, {
    onDelete: 'CASCADE',
});
Order.belongsTo(User);

Product.hasMany(OrderProduct, {
    onDelete: 'CASCADE',
});
OrderProduct.belongsTo(Product);

Order.hasMany(OrderProduct, {
    onDelete: 'CASCADE',
});
OrderProduct.belongsTo(Order);