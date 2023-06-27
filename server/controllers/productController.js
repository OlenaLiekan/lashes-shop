const uuid = require('uuid');
const path = require('path');
const { Product, ProductInfo } = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
  async create(req, res, next) {
    try {
      let { name, code, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));

      if (info) {
        info = JSON.parse(info);
        info.forEach(i =>
          ProductInfo.create({
            title: i.title,
            description: i.description,
            productId: product.id,
          })
        );
      }

      const product = await Product.create({ name, code, price, brandId, typeId, img: fileName });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { brandId, typeId, limit = 12, page = 1, rating, name } = req.query;
    const offset = page * limit - limit;

    let options = {
      limit,
      offset,
      where: {},
      include: [{ model: ProductInfo, as: 'info' }],
    };

    if (brandId) {
      options.where = { ...options.where, brandId };
    }

    if (typeId) {
      options.where = { ...options.where, typeId };
    }

    if (rating) {
      options.where = { ...options.where, rating };
    }

    const products = await Product.findAndCountAll(options);
    products.sort = req.query.sort;
    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: 'info' }],
    });
    return res.json(product);
  }
}

module.exports = new ProductController();
