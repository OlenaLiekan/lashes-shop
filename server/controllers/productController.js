const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuid = require('uuid');
const path = require('path');
const { Product, ProductInfo, ProductSlide } = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
  async create(req, res, next) {
    try {
      let { name, code, price, brandId, typeId, info, slide } = req.body;
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

      if (slide) {
        slide.forEach(i =>
          ProductSlide.create({
            img: i.fileName,
            productId: product.id,
          })
        );
      }

      const product = await Product.create({
        name,
        code,
        price,
        brandId,
        typeId,
        img: fileName,
        slide,
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { brandId, typeId, limit = 12, page = 1, rating, name, price } = req.query;
    const offset = page * limit - limit;

    let sort = req.query.sort ? req.query.sort : 'rating';
    let order = req.query.order ? req.query.order : 'ASC';

    let options = {
      limit,
      offset,
      order: [[sort, order]],
      distinct: true,
      where: {},
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductSlide, as: 'slide' },
      ],
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

    if (name) {
      options.where = {
        ...options.where,
        name: { [Op.iLike]: `%${name}%` },
      };
    }

    if (price) {
      options.where = { ...options.where, price };
    }

    const products = await Product.findAndCountAll(options);
    products.sort = req.query.sort;
    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductInfo, as: 'info' },
        { model: ProductSlide, as: 'slide' },
      ],
    });
    return res.json(product);
  }
}

module.exports = new ProductController();
