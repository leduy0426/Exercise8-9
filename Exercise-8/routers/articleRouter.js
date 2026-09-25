const express = require('express');
const router = express.Router();

// GET all articles
router.get('/', (req, res, next) => {
  try {
    const articles = [
      { id: 1, title: 'My Favorite Vacation', date: '2023-06-02', text: 'We spent seven days in Italy...' }
    ];
    res.json(articles);
  } catch (err) {
    next(err);
  }
});

// GET article by ID
router.get('/:id', (req, res, next) => {
  try {
    const articleId = parseInt(req.params.id, 10);
    if (isNaN(articleId)) {
      const error = new Error('Invalid article ID');
      error.status = 400;
      throw error;
    }
    if (articleId !== 1) {
      const error = new Error('Article not found');
      error.status = 404;
      throw error;
    }
    res.json({ id: 1, title: 'My Favorite Vacation', date: '2023-06-02', text: 'We spent seven days in Italy...' });
  } catch (err) {
    next(err);
  }
});

// POST /articles - Create article with error propagation
router.post('/', async (req, res, next) => {
  try {
    const { title, date, text } = req.body;
    
    // Simulate article saving validation logic
    if (!title || !text || !date) {
      throw new Error('Missing required article fields');
    }

    // Success response
    res.status(201).json({ message: 'Article saved successfully' });
  } catch (err) {
    // Pass error to centralized error-handling middleware
    next(err);
  }
});

// DELETE /articles/:id
router.delete('/:id', (req, res, next) => {
  try {
    const articleId = req.params.id;
    res.send(`Deleting article: ${articleId}`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
