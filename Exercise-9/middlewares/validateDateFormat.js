// Exercise 2 & 5: Middleware function validating date format (YYYY-MM-DD)
const validateDateFormat = (req, res, next) => {
  try {
    const { date } = req.body;
    // Regex matching YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (date && (!dateRegex.test(date) || isNaN(Date.parse(date)))) {
      return res.status(400).json({ error: 'Invalid date format. Expected YYYY-MM-DD' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send('Error validating date format');
  }
};

module.exports = validateDateFormat;
