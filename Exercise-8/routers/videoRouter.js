const express = require('express');
const router = express.Router();

// GET all videos
router.get('/', (req, res, next) => {
  try {
    const videos = [
      { id: 1, title: 'Express Tutorial', duration: '15m' }
    ];
    res.json(videos);
  } catch (err) {
    next(err);
  }
});

// GET video by ID with error propagation
router.get('/:id', (req, res, next) => {
  try {
    const videoId = parseInt(req.params.id, 10);
    if (isNaN(videoId)) {
      const error = new Error('Invalid video ID format');
      error.status = 400;
      throw error;
    }
    if (videoId !== 1) {
      const error = new Error('Video not found');
      error.status = 404;
      throw error;
    }
    res.json({ id: 1, title: 'Express Tutorial', duration: '15m' });
  } catch (err) {
    next(err);
  }
});

// POST /videos - Create video
router.post('/', (req, res, next) => {
  try {
    const { title, duration } = req.body;
    if (!title || !duration) {
      throw new Error('Missing required video fields');
    }
    res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
