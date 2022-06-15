const Router = require("express").Router;
const router = new Router();
const OrderController = require("../controllers/order-controller");
const authMiddleware = require("../middlewares/auth-middleware");

router.post("/", authMiddleware, OrderController.createOrder);
router.get("/", authMiddleware, OrderController.getOrders);
router.get("/data/:orderId", authMiddleware, OrderController.getOrderData);
// router.get("/", authMiddleware, OrderController.getOrder);
// router.delete("/", authMiddleware, OrderController.deleteOrder);
// router.put("/", authMiddleware, OrderController.updateOrderSatus);

module.exports = router;
