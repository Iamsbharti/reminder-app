const User = require("../models/User");
const shortid = require("shortid");
const logger = require("../library/logger");
const apiResponse = require("../library/apiResponse");
const { hashPassword } = require("../library/managePassword");

const registerUserControl = async (req, res) => {
  logger.info("Register User Control");
  const { name, email, mobile, password } = req.body;
  const hashedPassword = await hashPassword(password);
  // create new user schema
  let newUser = new User({
    userId: shortid.generate(),
    name: name,
    email: email,
    mobile: mobile,
    password: hashedPassword,
  });
  // check user email
  let isEmailPresent = await User.find({ email: email });
  if (isEmailPresent.length > 0) {
    return res
      .status(400)
      .json(apiResponse(true, "Email Already Exists", email));
  } else {
    // save user
    User.create(newUser, (error, user) => {
      if (error) {
        return res
          .status(500)
          .json(apiResponse(true, "Internal Server Error", error.message));
      } else {
        // remove sensitive info
        let userInfo = user.toObject();
        delete userInfo.password;
        delete userInfo.__v;
        res
          .status(200)
          .json(apiResponse(false, "User Registration Success", userInfo));
      }
    });
  }
};
module.exports = { registerUserControl };
