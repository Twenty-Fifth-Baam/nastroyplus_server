const attributeService = require("../service/attribute-service");
const ApiError = require("../exceptions/api-error");

class AttributesController {
  async createAttribute(req, res, next) {
    try {
      const { name, value, productId } = req.body;
      const attribute = await attributeService.createAttribute(
        name,
        value,
        productId
      );
      return res.json(attribute);
    } catch (e) {
      next(e);
    }
  }
  async deleteAttribute(req, res, next) {
    try {
      const { id } = req.body;
      const attribute = await attributeService.deleteAttribute(id);
      return res.json(attribute);
    } catch (e) {
      next(e);
    }
  }
  async updateAttribute(req, res, next) {
    try {
      const { id, name, value, productId } = req.body;
      const attribute = await attributeService.updateAttribute(
        id,
        name,
        value,
        productId
      );
      return res.json(attribute);
    } catch (e) {
      next(e);
    }
  }
  async getAttributes(req, res, next) {
    try {
      const subcategoryId = req.query.subcategoryId;

      if (subcategoryId) {
        const product = await attributeService.getAttributes(subcategoryId);
        return res.json(product);
      }
      const product = await attributeService.getProductsAll();
      return res.json(product);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AttributesController();
