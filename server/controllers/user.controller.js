const { StatusCodes } = require("http-status-codes");

const userCtrl = {
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      return res.status(StatusCodes.OK).json({ username, email, password });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  },
  login: (req, res) => {},
};

module.exports = userCtrl;
