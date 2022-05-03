const Router = require("express").Router;
const router = new Router();
const productController = require("../controllers/product-controller");

router.post("/", productController.createProduct);
router.delete("/", productController.deleteProduct);
router.put("/", productController.updateProduct);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
module.exports = router;
