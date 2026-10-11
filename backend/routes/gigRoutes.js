/* rudderz243, 2026 */
/*Asmare, 2023 */
// Import express to create the gig routes
const express = require("express");
const router = express.Router();

// Import the gig controller functions
const { getGigs, getGigById, createGig, updateGig, deleteGig, getMyGigs,} = require("../controllers/gigController.js");

const { validateAuth, validateRole,} = require("../middleware/authMiddleware.js");

// GET: get all active gigs
router.get("/", validateAuth, getGigs);

//GET: freelancers own gigs
router.get("/mine", validateAuth, validateRole("freelancer"), getMyGigs);

// GET: get a specific gig by its ID
router.get("/:id", validateAuth, getGigById);

// POST: Create a new gig, only users with the freelancer role can create gigs
router.post( "/", validateAuth, validateRole("freelancer"), createGig);

// PUT: Update an existing gig
router.put( "/:id", validateAuth, validateRole("freelancer", "admin"), updateGig);

// DELETE: Deactivate a gig
router.delete( "/:id", validateAuth, validateRole("freelancer", "admin"),deleteGig);

// Export the router 
module.exports = router;
/*Reference List:
Asmare,E. 2023. CRUD operations with Express and MongoDB. (Version 1.0) [Sourcce code] Availabale at:<https://medium.com/@it.ermias.asmare/crud-operations-with-express-and-mongodb-b8bb9af57cc0> [Accessed 10 October 2026].
rudderz243. 2026. bookModel.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/models/bookModel.js> [Accessed 2 September 2026]. 
*/