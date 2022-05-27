const User = require("./user-model");
const Token = require("./token-model");
const {
  Product,
  Category,
  Subcategory,
  Attribute,
} = require("./product-model");
const { Favorite } = require("./favorite-model");
const { Basket } = require("./basket-model");
const { Order, OrderProduct } = require("./order-model");

User.hasOne(Token);
Token.belongsTo(User);

Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

Subcategory.hasMany(Product);
Product.belongsTo(Subcategory);

Product.hasMany(Attribute);
Attribute.belongsTo(Product);

User.hasMany(Favorite);
Favorite.belongsTo(User);

Product.hasMany(Favorite);
Favorite.belongsTo(Product);


User.hasMany(Basket);
Basket.belongsTo(User);

Product.hasMany(Basket);
Basket.belongsTo(Product);

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(OrderProduct);
OrderProduct.belongsTo(Product);

Order.hasMany(OrderProduct);
OrderProduct.belongsTo(Order);