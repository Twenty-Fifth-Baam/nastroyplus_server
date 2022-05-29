const Router = require("express").Router;
const router = new Router();
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware');
const orderController = require("../controllers/order-controller");
const UserController = require("../controllers/user-controllers");
const productController = require("../controllers/product-controller");
const categoryController = require("../controllers/category-controller");
const attributeController = require("../controllers/attributes-controller");
const SubcategoryController = require("../controllers/subcategory-controller");


router.get('/order', authMiddleware, orderController.getAllOrders);
router.put('/order/:orderId', authMiddleware, orderController.changeOrderStatus);
router.get('/users', authMiddleware, UserController.getUsers);

router.post("/product", authMiddleware, productController.createProduct);
router.delete("/product", authMiddleware, productController.deleteProduct);
router.put("/product", authMiddleware, productController.updateProduct);

router.post("/category", authMiddleware, categoryController.createCategory);
router.delete("/category", authMiddleware, categoryController.deleteCategory);
router.put("/category", authMiddleware, categoryController.updateCategory);

router.post("/attribute", authMiddleware, attributeController.createAttribute);
router.delete("/attribute", authMiddleware, attributeController.deleteAttribute);
router.put("/attribute", authMiddleware, attributeController.updateAttribute);


router.post("/", authMiddleware, SubcategoryController.createSubcategory);
router.delete("/", authMiddleware, SubcategoryController.deleteSubcategory);
router.put("/", authMiddleware, SubcategoryController.updateSubcategory);


module.exports = router;
