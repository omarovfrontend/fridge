const router = require('express').Router();
const { Category, Product, User } = require('../db/models');

router.get('/', async (req, res) => {
  const products = await Product.findAll({
    include: [{
      model: Category,
    },
    {
      model: User,
    }],
    raw: true,
  });

  products.map((el) => ({
    ...el, owner: (el.user_id === req.session.userId),
  }));
  res.render('main'); // отображает мою хбс-ку - main.hbs
});

module.exports = router;
