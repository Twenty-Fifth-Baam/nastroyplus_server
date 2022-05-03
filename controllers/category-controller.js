const categoryService = require("../service/category-service");
const ApiError = require("../exceptions/api-error");

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const { name } = req.body;
      const category = await categoryService.createCategory(name);
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  async deleteCategory(req, res, next) {
    try {
      const { id } = req.body;
      const category = await categoryService.deleteCategory(id);
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  async updateCategory(req, res, next) {
    try {
      const { id, newName } = req.body;
      const category = await categoryService.updateCategory(id, newName);
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  async getCategories(req, res, next) {
    try {
      const categories = await categoryService.getCategories();
      return res.json(categories);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();
