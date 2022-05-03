const SubcategoryService = require("../service/subcategory-service");
const ApiError = require("../exceptions/api-error");

class CategoryController {
  async createSubcategory(req, res, next) {
    try {
      const { categoryId, nameSubcategory } = req.body;
      const subcategory = await SubcategoryService.createSubcategory(categoryId, nameSubcategory);
      return res.json(subcategory);
    } catch (e) {
      next(e);
    }
  }
  async deleteSubcategory(req, res, next) {
    try {
      const { id } = req.body;
      const category = await SubcategoryService.deleteSubcategory(id);
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  async updateSubcategory(req, res, next) {
    try {
      const { id, newName } = req.body;
      const category = await SubcategoryService.updateSubcategory(id, newName);
      return res.json(category);
    } catch (e) {
      next(e);
    }
  }
  async getSubcategories(req, res, next) {
    const categoryId = req.params.categoryId;
    try {
      const subcategories = await SubcategoryService.getSubcategories(categoryId);
      return res.json(subcategories);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CategoryController();
