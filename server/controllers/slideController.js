const uuid = require('uuid');
const path = require('path');
const { Slide } = require('../models/models');
const ApiError = require('../error/ApiError');

class SlideController {
  async create(req, res, next) {
    try {
      const { img } = req.files;
      let fileName = uuid.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const slide = await Slide.create({ img: fileName });
      return res.json(slide);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async destroy(req, res) {
    const { id } = req.query;
    const slide = await Slide.destroy({
      where: { id },
    });
    return res.json(slide);
  }

  async getAll(req, res) {
    const slides = await Slide.findAll();
    return res.json(slides);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const slide = await Slide.findOne({
      where: { id },
    });
    return res.json(slide);
  }
}

module.exports = new SlideController();
