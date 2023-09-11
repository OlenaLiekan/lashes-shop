const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const uuid = require('uuid');
const path = require('path');
const { Product, ProductInfo, ProductSlide, ProductText } = require('../models/models');
const ApiError = require('../error/ApiError');

class ProductController {
  async create(req, res, next) {
    try {
      let { name, code, price, brandId, typeId, info, isLashes, text } = req.body;
      const { img } = req.files;
      const { slide } = req.files;
      let fileName = uuid.v4() + '.jpg';
      let slideName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      if (slide.length > 1) {
        slide.forEach((img, i) => img.mv(path.resolve(__dirname, '..', 'static', i + slideName)));
      } else {
        slide.mv(path.resolve(__dirname, '..', 'static', slideName));
      }

      const product = await Product.create({
        name,
        code,
        price,
        brandId,
        typeId,
        img: fileName,
        isLashes,
      });

      if (text) {
        ProductText.create({
          text: text,
          productId: product.id,
        });
      }

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

      if (slide.length > 1) {
        slide.forEach((img, i) => {
          ProductSlide.create({
            slideImg: i + slideName,
            productId: product.id,
          });
        });
      } else {
        ProductSlide.create({
          slideImg: slideName,
          productId: product.id,
        });
      }

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

  async update(req, res, next) {
    const { id } = req.params;
    let { name, rating, code, price, brandId, typeId, info, isLashes, text, deletedSlideId } =
      req.body;

    const { img } = req.files ? req.files : '';
    const { slide } = req.files ? req.files : '';

    let fileName = uuid.v4() + '.jpg';
    let slideName = uuid.v4() + '.jpg';

    if (img) {
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
    }

    if (slide) {
      if (slide.length > 1) {
        slide.forEach((img, i) => img.mv(path.resolve(__dirname, '..', 'static', i + slideName)));
      } else {
        slide.mv(path.resolve(__dirname, '..', 'static', slideName));
      }
    }

    const options = { where: { id: id } };
    let props = {};

    if (img) {
      props = { ...props, img: fileName };
    }
    if (name) {
      props = { ...props, name };
    }
    if (code) {
      props = { ...props, code };
    }
    if (price) {
      props = { ...props, price };
    }
    if (brandId) {
      props = { ...props, brandId };
    }
    if (typeId) {
      props = { ...props, typeId };
    }
    if (rating) {
      props = { ...props, rating };
    }

    props = { ...props, isLashes };

    const product = await Product.update(props, options);

    if (text) {
      const productId = req.params.id;
      const textOps = { where: { productId: productId } };
      ProductText.update(
        {
          text: text,
        },
        textOps
      );
    }

    if (info) {
      const productId = req.params.id;
      const infoOps = { where: { productId: productId } };
      ProductInfo.destroy(infoOps);
      info = JSON.parse(info);
      info.forEach(i =>
        ProductInfo.create({
          title: i.title,
          description: i.description,
          productId: productId,
        })
      );
    }

    if (deletedSlideId) {
      deletedSlideId = JSON.parse(deletedSlideId);
      deletedSlideId.forEach(slideId => {
        const slideOps = { where: { id: slideId } };
        ProductSlide.destroy(slideOps);
      });
    }

    if (slide) {
      const productId = req.params.id;
      if (slide.length > 1) {
        slide.forEach((img, index) => {
          ProductSlide.create({
            slideImg: index + slideName,
            productId: productId,
          });
        });
      } else {
        ProductSlide.create({
          slideImg: slideName,
          productId: productId,
        });
      }
    }

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
        { model: ProductText, as: 'text' },
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
      options.where = { ...options.where, name: { [Op.iLike]: `%${name}%` } };
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
          { model: ProductText, as: 'text' },
        ],
      });
      return res.json(product);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }
}

module.exports = new ProductController();
