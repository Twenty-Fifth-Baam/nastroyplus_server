const ApiError = require("../exceptions/api-error");
const favoriteService = require("../service/favorite-service");

class FavoriteController {
  async addToFavorite(req, res, next) {
    try {
      const user = req.user;
      const productId = req.body.productId;
      const favorite = await favoriteService.addToFavorite(user.id, productId);
      return res.json(favorite);
    } catch (e) {
      next(e);
    }
  }

  async deleteFromFavorite(req, res, next) {
    try {
      const user = req.user;
      const favoriteId = req.body.favoriteId
      const favorite = await favoriteService.deleteFromFavorite(
        user.id,
        favoriteId
      );
      return res.json(favorite);
    } catch (e) {
      next(e);
    }
  }

  async getFavorites(req, res, next) {
    try {
      const user = req.user;
      const favorites = await favoriteService.getFavorites(user.id);
      return res.json(favorites);
    } catch (e) {
      next(e);
    }
  }

  async isFavorite(req, res, next) {
    console.log("sdfSFhjbvhgfhgfgnfdgfdghf", req.params.productId)
    try {
      const user = req.user;
      const {productId} = req.params
      const isfavorite = await favoriteService.isFavorite(user.id, productId);
      return res.json(isfavorite);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new FavoriteController();
