const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuid = require('uuid');
const path = require('path');
const { Product, ProductInfo, ProductSlide } = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
  async create(req, res, next) {
    try {
      let { name, code, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      const { slide } = req.files;
      let fileName = uuid.v4() + '.jpg';
      let slideName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      slide.forEach((img, i) => img.mv(path.resolve(__dirname, '..', 'static', i + slideName)));

      const product = await Product.create({
        name,
        code,
        price,
        brandId,
        typeId,
        img: fileName,
      });

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

      slide.forEach((img, i) => {
        ProductSlide.create({
          slideImg: i + slideName,
          productId: product.id,
        });
      });

      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async destroy(req, res) {
    const { id } = req.query;
    const product = await Product.destroy({
      where: { id },
    });
    return res.json(product);
  }

  async update(req, res) {
    const productId = req.params.id;
    let { name, code, price, brandId, typeId, info } = req.body;
    const { img } = req.files;
    const { slide } = req.files;
    let fileName = uuid.v4() + '.jpg';
    let slideName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    slide.forEach((img, i) => img.mv(path.resolve(__dirname, '..', 'static', i + slideName)));
    const options = { where: { id: productId } };
    const product = await Product.update(
      { name, code, price, brandId, typeId, img: fileName },
      options
    );

    if (info) {
      info = JSON.parse(info);
      info.forEach(i =>
        ProductInfo.update({
          title: i.title,
          description: i.description,
          productId: product.id,
        })
      );
    }

    slide.forEach((img, i) => {
      ProductSlide.update({
        slideImg: i + slideName,
        productId: product.id,
      });
    });
    return res.json(product);
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
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [
          { model: ProductInfo, as: 'info' },
          { model: ProductSlide, as: 'slide' },
        ],
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
