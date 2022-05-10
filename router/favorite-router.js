const Router = require("express").Router;
const router = new Router();
const FavoriteController = require("../controllers/favorite-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, FavoriteController.addToFavorite);

router.delete("/", authMiddleware, FavoriteController.deleteFromFavorite);
router.get("/", authMiddleware, FavoriteController.getFavorites);
router.get("/isfavorite/:productId", authMiddleware, FavoriteController.isFavorite);
// router.get("/:id", FavoriteController.getProduct);
module.exports = router;
