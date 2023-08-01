const Router = require('express');

const router = new Router();

const productRouter = require('./productRouter');
const userRouter = require('./userRouter');
const brandRouter = require('./brandRouter');
const typeRouter = require('./typeRouter');
const categoryRouter = require('./categoryRouter');
const slideRouter = require('./slideRouter');
const ratingRouter = require('./ratingRouter');
const reviewRouter = require('./reviewRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/product', productRouter);
router.use('/category', categoryRouter);
router.use('/slide', slideRouter);
router.use('/rating', ratingRouter);
router.use('/review', reviewRouter);

module.exports = router;
