const {Product, Subcategory, Attribute} = require("../models/product-model");
const ApiError = require("../exceptions/api-error");
const isvalidUUID = require("./uuid-service");
const {OrderProduct} = require("../models/order-model");

class ProductService {
    async createProduct(name, description, count, price, subcategoryId, image, attributes) {
        const product = await Product.findOne({where: {name: name}});
        if (product) {
            throw ApiError.BadRequest(`Данный товар уже существует!`);
        }
        if (!isvalidUUID(subcategoryId)) {
            throw ApiError.BadRequest(`Невалидная подкатегория!`);
        }
        const subcategory = await Subcategory.findOne({
            where: {id: subcategoryId},
        });

        if (!subcategory) {
            throw ApiError.BadRequest(`Данной подкатегории не существует!`);
        }
        const newProduct = await Product.create({
            name,
            description,
            count,
            price,
            subcategoryId,
            image,
        });
        if (attributes.length > 0) {
            const promises = attributes.map((attribute) =>
                Attribute.create({
                    productId: newProduct.id,
                    name: attribute.name,
                    value: attribute.value,
                })
            );
            const contents = await Promise.all(promises);
        }

        return newProduct;
    }

    async deleteProduct(id) {
        if (!isvalidUUID(id)) {
            throw ApiError.BadRequest(`Невалидный id товара!`);
        }
        const product = await Product.destroy({where: {id: id}});
        if (!product) {
            throw ApiError.BadRequest(`Данного товара не существует!`);
        }

        return product;
    }

    async updateProduct(
        id,
        name,
        description,
        count,
        price,
        subcategoryId,
        image
    ) {
        if (!isvalidUUID(id)) {
            throw ApiError.BadRequest(`Невалидный id товара!`);
        }
        const product = await Product.findOne({where: {id: id}});
        if (!product) {
            throw ApiError.BadRequest(`Данного товара не существует!`);
        }
        if (!isvalidUUID(subcategoryId)) {
            throw ApiError.BadRequest(`Невалидная подкатегория!`);
        }
        const subcategory = await Subcategory.findOne({
            where: {id: subcategoryId},
        });

        if (!subcategory) {
            throw ApiError.BadRequest(`Данной подкатегории не существует!`);
        }

        const updateProduct = await Product.update(
            {
                name: name,
                description: description,
                count: count,
                price: price,
                subcategoryId: subcategoryId,
                image: image,
            },
            {
                where: {
                    id: id,
                },
            }
        );
        return updateProduct;
    }

    async getProductData(id) {
        if (!isvalidUUID(id)) {
            throw ApiError.BadRequest(`Невалидный id товара!`);
        }
        const product = await Product.findOne({
            where: {id: id},
            include: {model: Attribute, as: "attributes", required: false},
        });
        if (!product) {
            throw ApiError.NotFound(`По вашему запросу ничего не найдено`);
        }
        return product;
    }

    async getProductsBySubcategory(subcategoryId, limit, page, sort, order) {
        let offset;
        if (page && limit) {
            offset = page * limit - limit;
        }
        if (!isvalidUUID(subcategoryId)) {
            throw ApiError.BadRequest(`Невалидный id подкатегории!`);
        }
        const subcategory = await Subcategory.findOne({
            where: {id: subcategoryId},
        });
        if (!subcategory) {
            throw ApiError.BadRequest(`Данной подкатегории не существует!`);
        }
        const count = await Product.count({
            where: {
                subcategoryId: subcategoryId,
            },
        });
        const products = await Product.findAll({
            where: {
                subcategoryId: subcategoryId,
            },
            order: sort && order ? [[sort, order]] : [],
            limit,
            offset,
        });
        return {products, count};
    }

    async getProductsAll(limit, page) {
        let offset;
        if (page && limit) {
            offset = page * limit - limit;
        }
        const count = await Product.count();
        const products = await Product.findAll({
            limit,
            offset,
        });
        return {products, count};
    }
}

module.exports = new ProductService();
