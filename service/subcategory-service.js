const { Category, Subcategory } = require("../models/product-model");
const ApiError = require("../exceptions/api-error");

const isvalidUUID = require("./uuid-service");

class SubcategoryService {
  async createSubcategory(categoryId, nameSubcategory) {
    const subcategory = await Subcategory.findOne({
      where: { name: nameSubcategory },
    });
    if (subcategory) {
      throw ApiError.BadRequest(`Данная подкатегория уже существует!`);
    }

    if (!isvalidUUID(categoryId)) {
      throw ApiError.BadRequest(`Невалидная категория!`);
    }
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      throw ApiError.BadRequest(`Данной категории не существует!`);
    }

    const newSubcategory = await Subcategory.create({
      name: nameSubcategory,
      categoryId: categoryId,
    });
    return newSubcategory;
  }

  async deleteSubcategory(id) {
    if (!isvalidUUID(id)) {
      throw ApiError.BadRequest(`Невалидная подкатегория!`);
    }
    const subcategory = await Subcategory.destroy({ where: { id: id } });
    if (!subcategory) {
      throw ApiError.BadRequest(`Данной подкатегории не существует!`);
    }
    return subcategory;
  }
  async updateSubcategory(id, newName) {
    if (!isvalidUUID(id)) {
      throw ApiError.BadRequest(`Невалидная подкатегория!`);
    }
    const subcategory = await Subcategory.findOne({ where: { id: id } });
    if (!subcategory) {
      throw ApiError.BadRequest(`Данной подкатегории не существует!`);
    }
    subcategory.name = newName;
    await subcategory.save();
    return subcategory;
  }
  async getSubcategories(categoryId) {
    if (!isvalidUUID(categoryId)) {
      throw ApiError.BadRequest(`Невалидная категория!`);
    }
    const category = await Category.findOne({ where: { id: categoryId } });
    if (!category) {
      throw ApiError.BadRequest(`Данной категории не существует!`);
    }
    const subcategories = await Subcategory.findAll({
      where: {
        categoryId: categoryId,
      },
    });

    return subcategories;
  }
}

module.exports = new SubcategoryService();
