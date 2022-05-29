const Router = require("express").Router;
const router = new Router();
const {body} = require("express-validator");
const categoryController = require("../controllers/category-controller");

router.get("/", categoryController.getCategories);
module.exports = router;
