const { Rating } = require('../models/models');
const ApiError = require('../error/ApiError');

class RatingController {
  async create(req, res) {
    let { name, userId, productId } = req.body;
    const rating = await Rating.create({ name, userId, productId });
    return res.json(rating);
  }

  async getAll(req, res) {
    const { productId } = req.query;
    let options = {
      where: {},
      order: [['id', 'ASC']],
    };
    if (productId) {
      options.where = { ...options.where, productId };
    }
    const ratings = await Rating.findAll(options);
    return res.json(ratings);
  }
}

module.exports = new RatingController();
