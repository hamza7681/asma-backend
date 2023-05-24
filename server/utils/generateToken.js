const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const generateToken =async (id) => {
  const token = jwt.sign(id, SECRET);
  return token;
};

module.exports = generateToken;
