const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");

// validate the user authentication token
const validateAuth = async (req, res, next) => {
  let token;

  // checks for the presence of the token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      // try and find the user associated with that token
      req.user = await User.findById(decode.id).select("-password");
      // check whether a user was found using that token
      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Requesting user no longer exists" });
      }
      // continuing from here
      return next();
    } catch (error) {
      // if we fail to decode their token, we return a 401
      // this is called a FAIL-CLOSE state. if something fails, we want to prevent auth, rather than just
      // let them through
      return res
        .status(401)
        .json({ message: "Not authorized, failed to validate token." });
    }
  }
  // if no token is provided, we return a 401 - not authorized
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized, no token provided." });
  }
};
// alongside validating that a correct token is provided, we need to check if the provided token has the permission to
// do what it wants to do
const validateRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Forbidden: you do not have permission to do this." });
    }
    // once we've validated the role, next() passes the incoming request to the next piece of middleware
    next();
  };
};

module.exports = { validateAuth, validateRole };
/*Reference List:
Medium. 2025. JWT Authentication in MERN Apps: A Beginner-Friendly Guide. (Version 1.0) [Source Code] Available at: <https://medium.com/@adityamohiteakm/jwt-authentication-in-mern-apps-a-beginner-friendly-guide-00ed6b6405fc> [Accessed 2 September 2026].
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/authController.js> [Accessed 2 September 2026]. 

*/