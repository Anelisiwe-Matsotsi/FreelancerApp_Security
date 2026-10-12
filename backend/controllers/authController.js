
/*rudderz243, 2026*/
//This is to call in the user model so we can  create new users and validate existing users
const User = require("../models/userModel.js");
//Used to create a token for the user to use when they log in, and to validate their token when they make requests
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger.js");

/*Medium, 2025 */
//This function is used to generate a token for the user when they log in or register
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

//This is a POST used to register a new user account
const registerUser = async(req, res) => {
    try {
        const { username, email, password, role } = req.body;

        if (!username || !email || !password ) {
            return res.status(400).json({message: "Please ensure all required information is present."});
        }
        //This is to check if the user already exists in the database based on their email address
        const userExists = await User.findOne({email});
        if (userExists) {
            logger.warn(`Registration attempted with duplicate email: ${email}`, "AUTH");
            return res.status(400).json({message: "A user with that email address already exists."});
        }
        
        const user = await User.create({
            username, email, password, role
        });
        //This is to return the new user and generate a token for them to use when they log in
        return res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role)
        });
    } catch (error) {
        logger.error(`Registration error: ${error.message}`, "AUTH", error);
        return res.status(500).json({message: "Server error during registration."});
    };
};

//This is a POST used to login the user based on their information
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Please provide both email and password."});
        }
        //This is to check if the user exists in the database based on their email address
        const user = await User.findOne({email});

        if (!user) {
            logger.warn(`Login attempted for email not in the database: ${email}`, "AUTH");
            return res.status(401).json({message: "Invalid email or password."});
        }
    
        const isMatch = await user.matchPassword(password);
    
        if (!isMatch) {
            logger.warn(`Incorrect password attempt for ${email}`, "AUTH");
            return res.status(401).json({message: "Invalid email or password."});
        }
        //Return user information and generate a token for the
        return res.status(200).json({
            _id : user._id,
            username : user.username,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
        });
    } catch (error) {
        logger.error(`Login error: ${error.message}`, "AUTH");
        return res.status(500).json({message: "Internal server error during login."});
    };
};

const getCurrentUser = async (req, res) => {
  // The validateAuth middleware attaches the authenticated user
  res.status(200).json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.email,
    role: req.user.role,
  });
};

module.exports = { registerUser, loginUser, getCurrentUser };

/*Reference List:
Medium. 2025. JWT Authentication in MERN Apps: A Beginner-Friendly Guide. (Version 1.0) [Source Code] Available at: <https://medium.com/@adityamohiteakm/jwt-authentication-in-mern-apps-a-beginner-friendly-guide-00ed6b6405fc> [Accessed 2 September 2026].
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/authController.js> [Accessed 2 September 2026]. 

*/

