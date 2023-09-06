const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Basket, UserOrder, OrderItem, UserAddress } = require('../models/models');

const generateJwt = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role, firstName, lastName, phone } = req.body;
    if (!email || !password) {
      return next(ApiError.badRequest('Invalid email or password'));
    }
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest('User with this email is allready exist'));
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({
      email,
      role,
      password: hashPassword,
      firstName,
      lastName,
      phone,
    });
    const basket = await Basket.create({ userId: user.id });
    const token = generateJwt(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return next(ApiError.internal('User not found'));
      }

      let comparePassword = bcrypt.compareSync(password, user.password);

      if (!comparePassword) {
        return next(ApiError.internal('Invalid password'));
      }

      const token = generateJwt(user.id, user.email, user.role);
      return res.json({ token });
    } catch (error) {
      console.log('error:', error);
    }
  }

  async refreshToken(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

  async getAll(req, res) {
    const { role, email } = req.query;
    let options = {
      where: {},
      include: [
        {
          model: UserOrder,
          as: 'order',
          include: [{ model: OrderItem, as: 'item' }],
        },
        {
          model: UserAddress,
          as: 'address',
        },
      ],
    };
    if (role) {
      options.where = { ...options.where, role };
    }
    if (email) {
      options.where = { ...options.where, email };
    }
    const users = await User.findAll(options);
    return res.json(users);
  }

  async getOne(req, res) {
    const { id } = req.params;
    let options = {
      where: {},
      include: [
        { model: UserOrder, as: 'order', include: [{ model: OrderItem, as: 'item' }] },
        {
          model: UserAddress,
          as: 'address',
        },
      ],
    };
    if (id) {
      options.where = { ...options.where, id };
    }
    const user = await User.findOne(options);
    return res.json(user);
  }

  async destroy(req, res) {
    const { id } = req.query;
    const user = await User.destroy({
      where: { id },
    });
    return res.json(user);
  }

  async update(req, res) {
    let {
      userId,
      quantity,
      sum,
      items,
      firstName,
      lastName,
      email,
      phone,
      company,
      firstAddress,
      secondAddress,
      city,
      country,
      region,
      postalCode,
      mainAddress,
      deletedAddressId,
    } = req.body;

    if (userId && items) {
      const order = await UserOrder.create({
        userId: userId,
        quantity: quantity,
        sum: sum,
      });
      items = JSON.parse(items);
      items.forEach(item => {
        OrderItem.create({
          title: item.name,
          description:
            'Marca: ' +
            item.company +
            '\nCódigo: ' +
            item.code +
            '\n' +
            (item.curlArr
              ? 'Opções: ' +
                item.curlArr +
                ' / ' +
                item.thicknessArr +
                ' / ' +
                item.lengthArr +
                '\n'
              : '') +
            (item.isLashes ? '' : item.info.map(obj => obj.title + ': ' + obj.description + '\n')) +
            'Preço: ' +
            item.price +
            ' €\n' +
            'Quantidade: ' +
            item.count,
          img: item.img,
          userOrderId: order.id,
        });
      });
    }

    if (userId && firstAddress) {
      company = company ? company : '';
      UserAddress.create({
        userId,
        firstName,
        lastName,
        email,
        phone,
        company: company,
        firstAddress,
        secondAddress,
        city,
        country,
        region,
        postalCode,
        mainAddress,
      });
    }

    if (userId && deletedAddressId) {
      UserAddress.destroy({
        where: { id: deletedAddressId },
      });
    }
  }
}

module.exports = new UserController();
