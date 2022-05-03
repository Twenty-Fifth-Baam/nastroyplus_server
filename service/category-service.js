const { Category, Subcategory } = require("../models/product-model");
const ApiError = require("../exceptions/api-error");

const isvalidUUID = require("./uuid-service");

class CategoryService {
  async createCategory(name) {
    const category = await Category.findOne({ where: { name: name } });
    if (category) {
      throw ApiError.BadRequest(`Данная категория уже существует!`);
    }
    const newCategory = await Category.create({
      name: name,
    });
    return newCategory;
  }
  async deleteCategory(id) {
    if (!isvalidUUID(id)) {
      throw ApiError.BadRequest(`Данной категории не существует!`);
    }
    const category = await Category.destroy({ where: { id: id } });
    if (!category) {
      throw ApiError.BadRequest(`Данной категории не существует!`);
    }
    return category;
  }
  async updateCategory(id, newName) {
    if (!isvalidUUID(id)) {
      throw ApiError.BadRequest(`Данной категории не существует!`);
    }
    const category = await Category.findOne({ where: { id: id } });
    if (!category) {
      console.log(category);
      throw ApiError.BadRequest(`Данной категории не существует!`);
    }
    category.name = newName;
    await category.save();
    return category;
  }
  async getCategories() {
    const categories = await Category.findAll({
      include: {
        model: Subcategory,
        as: "subcategories",
        required: false,
      }
    });
    return categories;
  }
}

module.exports = new CategoryService();
