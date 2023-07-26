const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const path = require('path');

class TypeController {
  async create(req, res) {
    let { name, categoryId } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const type = await Type.create({ name, categoryId, img: fileName });
    return res.json(type);
  }

  async destroy(req, res) {
    const { id } = req.query;
    const type = await Type.destroy({
      where: { id },
    });
    return res.json(type);
  }

  async updateOne(req, res) {
    const { id } = req.params;
    let { name, categoryId } = req.body;
    const { img } = req.files;
    let fileName = uuid.v4() + '.jpg';
    img.mv(path.resolve(__dirname, '..', 'static', fileName));
    const type = await Type.update({
      where: { id },
      name,
      categoryId,
      img: fileName,
    });
    return res.json(type);
  }

  async getAll(req, res) {
    const { categoryId } = req.query;
    let options = {
      where: {},
      order: [['id', 'ASC']],
    };
    if (categoryId) {
      options.where = { ...options.where, categoryId };
    }
    const types = await Type.findAll(options);
    return res.json(types);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const type = await Type.findOne({
      where: { id },
    });
    return res.json(type);
  }
}

module.exports = new TypeController();
