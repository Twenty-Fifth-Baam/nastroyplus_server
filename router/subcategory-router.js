const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const SubcategoryController = require("../controllers/subcategory-controller");

router.post("/", SubcategoryController.createSubcategory);
router.delete("/", SubcategoryController.deleteSubcategory);
router.put("/", SubcategoryController.updateSubcategory);
router.get("/:categoryId", SubcategoryController.getSubcategories);
module.exports = router;
