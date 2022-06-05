const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = function (req, res, next) {
  try {
    const role = req.user.role;
    console.log(role)
    if (role !== "ADMIN") {
      return next(ApiError.NotPermissions("У вас нет прав!"));
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
