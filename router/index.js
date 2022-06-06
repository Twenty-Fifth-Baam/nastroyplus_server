const userRouter = require("./user-router");
const categoryRouter = require("./category-router");
const subcategoryRouter = require("./subcategory-router");
const productRouter = require("./product-router");
const attributeRouter = require("./attribute-router");
const favoriteRouter = require("./favorite-router");
const basketRouter = require("./basket-router");
const orderRouter = require("./order-router");
const adminRouter = require("./admin-router");
const searchRouter = require("./search-router");

const Router = require("express").Router;
const router = new Router();


router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/subcategory", subcategoryRouter);
router.use("/product", productRouter);
router.use("/search", searchRouter);
router.use("/attribute", attributeRouter);
router.use("/favorite", favoriteRouter);
router.use("/basket", basketRouter);
router.use("/order", orderRouter);
router.use("/admin", adminRouter);

module.exports = router;
