const User = require("./user-model");
const Token = require("./token-model");
const {Product, Category, Subcategory, Attribute} = require("./product-model");

User.hasOne(Token);
Token.belongsTo(User);


Category.hasMany(Subcategory);
Subcategory.belongsTo(Category);

Subcategory.hasMany(Product);
Product.belongsTo(Subcategory);

Product.hasMany(Attribute);
Attribute.belongsTo(Product);