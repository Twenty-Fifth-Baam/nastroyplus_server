const ApiError = require("../exceptions/api-error");
const basketService = require("../service/basket-service");

class BasketController {
  async addToBasket(req, res, next) {
    try {
      const user = req.user;
      const productId = req.body.productId;
      const count = req.body.count || 1;
      const basket = await basketService.addToBasket(user.id, productId, count);
      return res.json(basket);
    } catch (e) {
      next(e);
    }
  }
  async getBaskets(req, res, next) {
    try {
      const user = req.user;
      const baskets = await basketService.getBaskets(user.id);
      return res.json(baskets);
    } catch (e) {
      next(e);
    }
  }

  async deleteFromBasket(req, res, next) {
    try {
      const user = req.user;
      const productId = req.body.productId;
      const basket = await basketService.deleteFromBasket(user.id, productId);
      return res.json(basket);
    } catch (e) {
      next(e);
    }
  }

  async isBasket(req, res, next) {
    try {
      const user = req.user;
      const { productId } = req.params;
      const isbasket = await basketService.isBasket(user.id, productId);
      return res.json(isbasket);
    } catch (e) {
      next(e);
    }
  }
  async updateBasketCount(req, res, next) {
    try {
      const user = req.user;
      const { productId, count } = req.body;
      const basket = await basketService.updateBasketCount(
        user.id,
        productId,
        count
      );
      return res.json(basket);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new BasketController();
