const express = require('express');
const router = express.Router();

const validateArticle = require('../middlewares/validateArticle');
const validateDateFormat = require('../middlewares/validateDateFormat');
const validateTextLength = require('../middlewares/validateTextLength');

// GET /articles
router.get('/', (req, res) => {
  res.json({ message: 'List of articles' });
});

// POST /articles with custom validation middlewares
router.post(
  '/',
  validateArticle,
  validateDateFormat,
  validateTextLength(10),
  async (req, res) => {
    try {
      res.status(201).end(
        'Will add the article: ' + req.body.title + ' with details: ' + req.body.text + ' and ' + req.body.date
      );
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

module.exports = router;
