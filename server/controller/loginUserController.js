const User = require("../models/User");
const logger = require("../library/logger");
const apiResponse = require("../library/apiResponse");
const { comparePassword } = require("../library/managePassword");
const { generateJwtToken } = require("../library/generateJwtToken");

const initUserToken = async (userData, res) => {
  // remove sensitive user data
  let userInfo = userData.toObject();
  delete userInfo._id;
  delete userInfo.mobile;
  delete userInfo.email;
  delete userInfo.reminderCreated;
  delete userInfo.password;
  let authenticatedUserInfo;
  generateJwtToken(userInfo, (error, token) => {
    if (error) {
      return res
        .status(500)
        .json(apiResponse(true, "Token Generation Error", error));
    } else {
      authenticatedUserInfo = token;
    }
  });
  return authenticatedUserInfo;
};
const loginUserControl = async (req, res) => {
  logger.info("Login Control");
  const { loginId } = req.body;

  const userQuery = loginId.includes("@")
    ? { email: loginId }
    : { mobile: loginId };

  let isUserPresent = await User.findOne(userQuery).populate([
    {
      path: "reminderCreated",
      populate: [
        {
          path: "reminder",
          model: "Reminder",
          select: ["_id", "reminderId"],
        },
      ],
    },
  ]);
  if (!isUserPresent || isUserPresent.length <= 0) {
    return res
      .status(404)
      .json(apiResponse(true, "You are Not with Us", loginId));
  } else {
    let userData = isUserPresent;
    // compare with hashed secret
    let authenticated = await comparePassword(
      req.body.password,
      userData.password
    );
    if (authenticated) {
      // generate JWT Token
      let jwtToken = await initUserToken(userData, res);
      let userInfo = userData.toObject();
      delete userInfo.password;

      // set header
      res.header("authToken", jwtToken.authToken);
      res.status(200).json(
        apiResponse(false, "Login Success", {
          ...userInfo,
          authToken: jwtToken.authToken,
        })
      );
    } else {
      res.status(401).json(apiResponse(true, "Authentication Error", loginId));
    }
  }
};
module.exports = { loginUserControl };
