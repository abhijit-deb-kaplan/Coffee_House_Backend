const { coffeeMenuService } = require("../services/coffeeService");

const getCoffeeMenu = async (req, res) => {
  try {
    const { page, pageSize } = req.query;
    const currentPage = parseInt(page) || 1;
    const itemsPerPage = parseInt(pageSize) || 10;
    const data = await coffeeMenuService(currentPage, itemsPerPage);

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "Error querying the database:" });
  }
};

module.exports = { getCoffeeMenu };
