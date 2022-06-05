const Router = require("express").Router;
const router = new Router();
const {body} = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware');
const adminMiddleware = require('../middlewares/admin-middleware');
const orderController = require("../controllers/order-controller");
const UserController = require("../controllers/user-controllers");
const productController = require("../controllers/product-controller");
const categoryController = require("../controllers/category-controller");
const attributeController = require("../controllers/attributes-controller");
const SubcategoryController = require("../controllers/subcategory-controller");


router.get('/order', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/order/:orderId', authMiddleware, adminMiddleware, orderController.changeOrderStatus);
router.get('/users', authMiddleware, adminMiddleware, UserController.getUsers);

router.post("/product", authMiddleware, adminMiddleware, productController.createProduct);
router.delete("/product", authMiddleware, adminMiddleware, productController.deleteProduct);
router.put("/product", authMiddleware, adminMiddleware, productController.updateProduct);

router.post("/category", authMiddleware, adminMiddleware, categoryController.createCategory);
router.delete("/category", authMiddleware, adminMiddleware, categoryController.deleteCategory);
router.put("/category", authMiddleware, adminMiddleware, categoryController.updateCategory);

router.post("/attribute", authMiddleware, adminMiddleware, attributeController.createAttribute);
router.delete("/attribute", authMiddleware, adminMiddleware, attributeController.deleteAttribute);
router.put("/attribute", authMiddleware, attributeController.updateAttribute);


router.post("/subcategory", authMiddleware, adminMiddleware, SubcategoryController.createSubcategory);
router.delete("/subcategory", authMiddleware, adminMiddleware, SubcategoryController.deleteSubcategory);
router.put("/subcategory", authMiddleware, adminMiddleware, SubcategoryController.updateSubcategory);


module.exports = router;
