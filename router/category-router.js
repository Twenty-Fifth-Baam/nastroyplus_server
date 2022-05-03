const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const categoryController = require("../controllers/category-controller");

router.post("/", categoryController.createCategory);
router.delete("/", categoryController.deleteCategory);
router.put("/", categoryController.updateCategory);
router.get("/", categoryController.getCategories);
module.exports = router;
