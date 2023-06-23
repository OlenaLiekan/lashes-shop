const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
  async create(req, res) {
    const { name, categoryId } = req.body;
    const type = await Type.create({ name, categoryId });
    return res.json(type);
  }

  async getAll(req, res) {
    const { categoryId } = req.query;
    let options = {
      where: {},
    };
    if (categoryId) {
      options.where = { ...options.where, categoryId };
    }
    const types = await Type.findAll(options);
    return res.json(types);
  }
}

module.exports = new TypeController();
