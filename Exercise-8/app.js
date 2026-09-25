const express = require('express');
const articleRouter = require('./routers/articleRouter');
const videoRouter = require('./routers/videoRouter');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Register modular routers
app.use('/articles', articleRouter);
app.use('/videos', videoRouter);

// Centralized Error-handling Middleware
// Note: Error-handling middleware in Express MUST take 4 arguments: (err, req, res, next)
app.use((err, req, res, next) => {
  console.error('Error Stack:', err.stack); // Log error stack for debugging

  // Return formatted JSON error response
  res.status(err.status || 500).json({
    error: err.message || "An error occurred, please try again later."
  });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
