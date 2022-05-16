const { Product, Attribute } = require("../models/product-model");
const ApiError = require("../exceptions/api-error");
const isvalidUUID = require("./uuid-service");
const { Op } = require("sequelize");

class AttributeService {
  async createAttribute(name, value, productId) {
    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id продукта!`);
    }
    const product = await Product.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw ApiError.BadRequest(`Данного товара не существует!`);
    }
    const attribute = await Attribute.findOne({
      where: {
        [Op.and]: [
          {
            name: name,
          },
          {
            productId: productId,
          },
        ],
      },
    });

    if (attribute) {
      throw ApiError.BadRequest(`Данный атрибут уже существует!`);
    }
    const newAttribute = await Attribute.create({
      name,
      value,
      productId,
    });
    return newAttribute;
  }
  async deleteAttribute(id) {
    if (!isvalidUUID(id)) {
      throw ApiError.BadRequest(`Невалидный id атрибута!`);
    }
    const attribute = await Attribute.destroy({ where: { id: id } });
    if (!attribute) {
      throw ApiError.BadRequest(`Данного атрибута не существует!`);
    }
    return attribute;
  }

  async updateAttribute(id, name, value, productId) {
    if (!isvalidUUID(id)) {
      throw ApiError.BadRequest(`Невалидный id атрибута!`);
    }
    const attribute = await Attribute.findOne({
      where: { id: id },
    });

    if (!attribute) {
      throw ApiError.BadRequest(`Данного атрибута не существует!`);
    }

    if (!isvalidUUID(productId)) {
      throw ApiError.BadRequest(`Невалидный id товара!`);
    }
    const product = await Product.findOne({ where: { id: productId } });
    if (!product) {
      throw ApiError.BadRequest(`Данного товара не существует!`);
    }

    const updateAttribute = await Attribute.update(
      {
        name: name,
        value: value,
        productId: productId,
      },
      {
        where: {
          id: id,
        },
      }
    );
    return updateAttribute;
  }

  async getAttributes(subcategoryId) {
    if (!isvalidUUID(subcategoryId)) {
      throw ApiError.BadRequest(`Невалидный id подкатегории!`);
    }
    const subcategory = await Subcategory.findOne({
      where: { id: subcategoryId },
    });
    if (!subcategory) {
      throw ApiError.BadRequest(`Данной подкатегории не существует!`);
    }
    const products = await Product.findAll({
      where: {
        subcategoryId: subcategoryId,
      },
    });
    return products;
  }
  async getProductsAll() {
    const products = await Product.findAll();
    return products;
  }
}

module.exports = new AttributeService();
