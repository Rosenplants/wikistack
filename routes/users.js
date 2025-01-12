const { Router } = require('express');
const { User, Page } = require('../models/index');
const { userList, userPages } = require('../views');

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.send(userList(users));
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    const pages = await Page.findAll({
      where: { authorId: req.params.id },
    });
    res.send(userPages(user, pages));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
