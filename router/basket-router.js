const Router = require("express").Router;
const router = new Router();
const BasketController = require("../controllers/basket-controller")
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, BasketController.addToBasket);
router.get("/", authMiddleware, BasketController.getBaskets);
router.delete("/", authMiddleware, BasketController.deleteFromBasket);
router.get("/isbasket/:productId", authMiddleware, BasketController.isBasket);
router.put("/", authMiddleware, BasketController.updateBasketCount); 

module.exports = router;
