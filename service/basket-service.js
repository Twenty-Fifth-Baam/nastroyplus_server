const { Product, Subcategory, Attribute } = require("../models/product-model");
const ApiError = require("../exceptions/api-error");
const isvalidUUID = require("./uuid-service");
const { Favorite } = require("../models/favorite-model");
const { Op } = require("sequelize");
const { Basket } = require("../models/basket-model");

class FavoriteService {
  async addToBasket(userId, productId, count) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const product = await Basket.findOne({
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
    if (product) {
      throw ApiError.BadRequest(`Данный товар уже в корзине!`);
    }
    const basket = Basket.create({
      productId: productId,
      userId: userId,
      count: count,
    });
    return basket;
  }
  async getBaskets(userId) {
    const baskets = await Basket.findAll({
      where: {
        userId: userId,
      },
      include: Product,
    });
    return baskets;
  }

  async deleteFromBasket(userId, productId) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const basket = await Basket.destroy({
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
    return basket;
  }

  async isBasket(userId, productId) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const basket = await Basket.findOne({
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
    return basket ? true : false;
  }

  async updateBasketCount(userId, productId, count) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const basket = await Basket.findOne({
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
      include: Product
    });
    if (!basket) {
      throw ApiError.BadRequest(`Данного товара не существует!`);
    }
    if (count > basket.product.count) {
      throw ApiError.BadRequest(`Превышен лимит количества данного товара!`);
    }

    const updateCount = await Basket.update(
      {
        count: count,
      },
      {
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
      }
    );
    return updateCount;
  }
}

module.exports = new FavoriteService();
