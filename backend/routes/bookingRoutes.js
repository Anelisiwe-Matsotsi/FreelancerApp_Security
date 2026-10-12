/*(Rudman, 2026) */
/*(Medium, 2025) */
const express = require("express");
const { 
    createBooking, 
    getAllBookings,
    getBooking,
    updateBooking,
    deleteBooking

} = require("../controllers/bookingController.js");

//calling methods to protect booking routes
const{
    validateAuth,
    validateRole,
} = require("../middleware/authMiddleware.js");

const router = express.Router();

//POST : to make a booking
router.post("/", validateAuth, validateRole("client"), createBooking);

//GET : gets all the bookings
router.get("/", validateAuth, getAllBookings);

//GET: gets a specific booking by ID
router.get("/:id", validateAuth, getBooking);

//PATCH : clients cancel, freelancers confirm / complete / decline (the controller checks which status each role may set)
router.patch("/:id", validateAuth, validateRole("client", "freelancer"), updateBooking); 

//DELETE: clients can delete a  Booking
router.delete("/:id", validateAuth, validateRole("client"), deleteBooking);

module.exports = router;

/*Reference List:
Medium. 2025. Building a User Authentication System with Node.js, PostgreSQL & Sequelize. (Version 1.0) [Source Code] Available at: <https://medium.com/@medhavisingh16/building-a-user-authentication-system-with-node-js-postgresql-sequelize-cd1c59532ace> [Accessed 2 September 2026].
Rudman, G., 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/routes/authRoutes.js> [Accessed 2 September 2026]. 
*/