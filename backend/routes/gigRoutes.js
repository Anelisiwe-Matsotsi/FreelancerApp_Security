/* rudderz243, 2026 */

// Import express to create the gig routes
const express = require("express");
const router = express.Router();

// Import the gig controller functions
const { getGigs, getGigById, createGig, updateGig, deleteGig,} = require("../controllers/gigController.js");

const { validateAuth, validateRole,} = require("../middleware/authMiddleware.js");

// GET: get all active gigs
router.get("/", validateAuth, getGigs);

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
