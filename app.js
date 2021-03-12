/* eslint-disable no-console */
const express = require('express');
const morgan = require('morgan');
const { db } = require('./models');
const wikiRouter = require('./routes/wiki');
const usersRouter = require('./routes/users');

const port = 3000;

const app = express();

module.exports = app;

app.use(morgan('dev'));

app.use(express.static(`${__dirname}/public`));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/users', usersRouter);

db.authenticate().then(() => {
  console.log('connected to the database');
});

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  console.log(err.stack);
  res.status(500).send('welp');
});

const init = async () => {
  // await db.sync({ force: true });
  await db.sync();

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}!`);
  });
};

init();
