const ApiError = require("../exceptions/api-error");
const orderService = require("../service/order-service");

class OrderController {
    async createOrder(req, res, next) {
        try {
            const user = req.user;
            const {address} = req.body;
            const order = await orderService.createOrder(user, address);
            return res.json(order);
        } catch (e) {
            next(e);
        }
    }

    async getOrders(req, res, next) {
        try {
            const user = req.user;
            const orders = await orderService.getOrders(user.id);
            return res.json(orders);
        } catch (e) {
            next(e);
        }
    }

    async getOrderData(req, res, next) {
        try {
            const {orderId} = req.params;
            const orderData = await orderService.getOrderData(orderId);
            return res.json(orderData);
        } catch (e) {
            next(e);
        }
    }

    async getAllOrders(req, res, next) {
        try {
            const orders = await orderService.getAllOrders();
            return res.json(orders);
        } catch (e) {
            next(e);
        }
    }

    async changeOrderStatus(req, res, next) {
        try {
            const {orderId} = req.params;
            const order = await orderService.changeOrderStatus(orderId);
            return res.json(order);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new OrderController();
