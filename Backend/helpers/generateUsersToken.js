const jwt = require("jsonwebtoken");

const generateUsersToken = (id, email) => {
  return jwt.sign({ id, email }, '123456765432123456');
};

module.exports = {
  generateUsersToken,
};
