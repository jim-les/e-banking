const jwt = require("jsonwebtoken");

const generateAdminsToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, '123456765432123456');
};

module.exports = {
  generateAdminsToken,
};
