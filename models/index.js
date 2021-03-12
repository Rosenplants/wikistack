const Sequelize = require('sequelize');
const slugGen = require('../hooks/beforeValidate');

const db = new Sequelize('postgres://localhost:5432/wikistack', {
  logging: false,
});

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  slug: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM('open', 'closed'),
  },
});

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
});

Page.beforeValidate((pageInstance) => {
  pageInstance.slug = slugGen(pageInstance.slug);
  console.log(pageInstance.slug);
});

Page.belongsTo(User, { as: 'author' });

module.exports = {
  db,
  Page,
  User,
};
