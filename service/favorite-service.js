const { Product, Subcategory, Attribute } = require("../models/product-model");
const ApiError = require("../exceptions/api-error");
const isvalidUUID = require("./uuid-service");
const { Favorite } = require("../models/favorite-model");
const { Op } = require("sequelize");

class FavoriteService {
  async addToFavorite(userId, productId) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const product = await Favorite.findOne({
      where: {
        [Op.and]: [
          {
            userId: userId,
          },
          {
            productId: productId,
          },
        ],
      },
    });
    console.log("dwsfsadfsd", product);
    if (product) {
      throw ApiError.BadRequest(`Данный товар уже в избранном!`);
    }

    const favorite = Favorite.create({ productId: productId, userId: userId });

    return favorite;
  }

  async deleteFromFavorite(userId, productId) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const favorite = await Favorite.destroy({
      where: {
        [Op.and]: [
          {
            userId: userId,
          },
          {
            productId: productId,
          },
        ],
      },
    });
    return favorite;
  }
  async getFavorites(userId) {
    const favorite = await Favorite.findAll({
      where: {
        userId: userId,
      },
      include: Product,
    });
    return favorite;
  }
  async isFavorite(userId, productId) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const favorite = await Favorite.findOne({
      where: {
        [Op.and]: [
          {
            userId: userId,
          },
          {
            productId: productId,
          },
        ],
      },
    });
    return favorite ? true : false;
  }
}

module.exports = new FavoriteService();
