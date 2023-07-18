const { Category } = require('../models/models');
const ApiError = require('../error/ApiError');

class CategoryController {
  async create(req, res) {
    const { name, subMenu } = req.body;
    const category = await Category.create({ name, subMenu });
    return res.json(category);
  }

  async getAll(req, res) {
    const categories = await Category.findAll({
      order: [['id', 'ASC']],
    });
    return res.json(categories);
  }
}

module.exports = new CategoryController();
