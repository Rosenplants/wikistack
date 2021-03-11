const express = require('express');
const morgan = require('morgan');
const html = require('./views/layout');
const port = 3000;
const { db, User, Page } = require('./models');
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

const app = express();

module.exports = app;

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // res.send(html(''));
  res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

db.authenticate().then(() => {
  console.log('connected to the database');
});

const init = async () => {
  await db.sync({ force: true });
  // await db.sync();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
  });
};

init();
