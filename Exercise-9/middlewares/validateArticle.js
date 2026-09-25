// Exercise 1 & 5: Middleware function checking request body validation for article endpoint
const validateArticle = async (req, res, next) => {
  try {
    const { title, date, text } = req.body;

    // Check if title, date, and text are present
    if (!title || !date || !text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error validating article');
  }
};

module.exports = validateArticle;
