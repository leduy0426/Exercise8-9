const express = require('express');
const articleRouter = require('./routers/articleRouter');

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Mount routers
app.use('/articles', articleRouter);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
