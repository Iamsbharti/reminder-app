const bcrypt = require("bcrypt");

exports.hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(11);
  let hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

exports.comparePassword = async (password, hashedPassword) => {
  let result = await bcrypt.compare(password, hashedPassword);
  return result;
};
