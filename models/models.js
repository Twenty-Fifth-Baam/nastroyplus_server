const User = require("./user-model");
const Token = require("./token-model");

User.hasOne(Token);
Token.belongsTo(User);
