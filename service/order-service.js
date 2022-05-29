const { Product, Subcategory, Attribute } = require("../models/product-model");
const ApiError = require("../exceptions/api-error");
const isvalidUUID = require("./uuid-service");
const { Basket } = require("../models/basket-model");
const { Order, OrderProduct } = require("../models/order-model");

class OrderService {
  async createOrder(userId) {
    const baskets = await Basket.findAll({
      where: {
        userId: userId,
      },
      include: { model: Product, as: "product", required: false },
    });
    if (baskets.length == 0) {
      throw ApiError.BadRequest(`В корзине пусто!`);
    }
    const totalPrice = baskets
      .reduce((accum, basket) => accum + basket.product.price * basket.count, 0)
      .toFixed(2);

    const order = await Order.create({
      userId: userId,
      totalPrice: totalPrice,
    });
    const promises = baskets.map((basket) =>
      OrderProduct.create({
        orderId: order.id,
        productId: basket.product.id,
        count: basket.count,
      })
    );

    const contents = await Promise.all(promises);

    await Basket.destroy({
      where: {
        userId: userId,
      },
    });

    return order;
  }

  async getOrders(userId) {
    const orders = await Order.findAll({
      where: {
        userId: userId,
      },
    });
    if (orders.length == 0) {
      throw ApiError.BadRequest(`У вас нет заказов!`);
    }
    return orders;
  }
  async getOrderData(orderId) {
    if (!isvalidUUID(orderId)) {
      throw ApiError.BadRequest(`Невалидный id заказа!`);
    }
    const orderData = await OrderProduct.findAll({
      where: {
        orderId: orderId,
      },
      include: Product,
    });

    return orderData;
  }
  async getAllOrders() {
    const orders = await Order.findAll({});
    if (orders.length == 0) {
      throw ApiError.BadRequest(`Нет заказов!`);
    }
    return orders;
  }

  async changeOrderStatus(orderId) {
    if (!isvalidUUID(orderId)) {
      throw ApiError.BadRequest(`Невалидный id заказа!`);
    }
    const order = await Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      throw ApiError.BadRequest(`Заказа с таким id не существует!`);
    }
    order.status = true;
    await order.save();
    return order;
  }
}

module.exports = new OrderService();