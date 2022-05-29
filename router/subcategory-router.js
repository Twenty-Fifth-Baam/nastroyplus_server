const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const SubcategoryController = require("../controllers/subcategory-controller");

router.get("/:categoryId", SubcategoryController.getSubcategories);
module.exports = router;
