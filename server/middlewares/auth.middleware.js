const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const auth = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Invalid Token" });
  } else {
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ msg: "User is not authentication!" });
      } else {
        req.user = user;
        next();
      }
    });
  }
};

module.exports = auth;
