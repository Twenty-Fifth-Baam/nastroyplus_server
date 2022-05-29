const Router = require("express").Router;
const router = new Router();
const productController = require("../controllers/product-controller");


router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
module.exports = router;
