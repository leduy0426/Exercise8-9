// Exercise 3 & 5: Middleware function ensuring text field meets length requirements
const validateTextLength = (minLength = 10) => {
  return (req, res, next) => {
    try {
      const { text } = req.body;
      if (text && text.trim().length < minLength) {
        return res.status(400).json({
          error: `Text must be at least ${minLength} characters long`
        });
      }
      next();
    } catch (error) {
      console.error(error);
      res.status(500).send('Error validating text length');
    }
  };
};

module.exports = validateTextLength;
