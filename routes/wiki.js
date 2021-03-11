const { Router } = require('express');
const html = require('../views/addPage');

const router = Router();

router.get('/', (req, res, next) => {
  res.send('<h1>wiki</h1>');
});

router.post('/', (req, res, next) => {
  res.json(req.body);
});

router.get('/add', (req, res, next) => {
  res.send(html());
});

module.exports = router;
