const productService = require("../service/product-service");
const ApiError = require("../exceptions/api-error");

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name, description, count, price, subcategoryId, image } =
        req.body;
      const product = await productService.createProduct(
        name,
        description,
        count,
        price,
        subcategoryId,
        image
      );
      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.body;
      const product = await productService.deleteProduct(id);
      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id, name, description, count, price, subcategoryId, image} = req.body;
      const product = await productService.updateProduct(
        id,
        name,
        description,
        count,
        price,
        subcategoryId,
        image,
      );
      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async getProducts(req, res, next) {
    try {
      const subcategoryId = req.query.subcategoryId;
      const { _limit, _page } = req.query;
      if (subcategoryId) {
        const product = await productService.getProductsBySubcategory(
          subcategoryId,
          _limit,
          _page
        );
        return res.json(product);
      }

      const product = await productService.getProductsAll(_limit, _page);
      return res.json(product);
    } catch (e) {
      next(e);
    }
  }

  async getProduct(req, res, next) {
    try {
      const id = req.params.id;
      const productData = await productService.getProductData(id);
      return res.json(productData);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProductController();
