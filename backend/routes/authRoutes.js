/*rudderz243, 2026 */
/*Medium, 2025 */
const express = require("express");
const {
registerUser,
loginUser,
getCurrentUser
} = require("../controllers/authController.js");
const { validateAuth } = require("../middleware/authMiddleware.js");

const router = express.Router();
//Handles the POST request to register a new user
router.post("/register", registerUser);
//Handles the POST request to login a user
router.post("/login", loginUser);

router.get("/me", validateAuth, getCurrentUser);

module.exports = router;
/*Reference List:
Medium. 2025. Building a User Authentication System with Node.js, PostgreSQL & Sequelize. (Version 1.0) [Source Code] Available at: <https://medium.com/@medhavisingh16/building-a-user-authentication-system-with-node-js-postgresql-sequelize-cd1c59532ace> [Accessed 2 September 2026].
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/authRoutes.js> [Accessed 2 September 2026]. 
*/