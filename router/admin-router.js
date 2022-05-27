const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require('../middlewares/auth-middleware');
const orderController = require("../controllers/order-controller");


router.get('/order', authMiddleware, orderController.getAllOrders);
router.put('/order/:orderId', authMiddleware, orderController.changeOrderStatus);

module.exports = router;
