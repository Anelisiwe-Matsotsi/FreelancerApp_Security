
//imports the gig model 
const Gig = require("../models/gigModel.js");
//import user model to chech if a freelancer exists
const User = require("../models/userModel.js");


//GET: get all active gigs
//any logged in user can view the available gigs
const getGigs = async (req, res) => {
  try {
    // Only return gigs that are currently active.
    const gigs = await Gig.find({ isActive: true })
      .populate("freelancer", "username")
      .sort({ createdAt: -1 });

    return res.status(200).json(gigs);
  } catch (error) {
    console.error("Error retrieving gigs:", error.message);

    return res.status(500).json({
      message: "Server error while retrieving gigs.",
    });
  }
};

//GET: using id
const getGigById = async (req, res) => {
  try {
    // Find the gig and include the freelancer's username
    const gig = await Gig.findById(req.params.id)
      .populate("freelancer", "username");

    // Return 404 if the gig does not exist
    if (!gig || !gig.isActive) {
      return res.status(404).json({
        message: "Gig not found.",
      });
    }

    return res.status(200).json(gig);
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid gig ID.",
      });
    }

    console.error("Error retrieving gig:", error.message);

    return res.status(500).json({
      message: "Server error while retrieving the gig.",
    });
  }
};

//POST: create a new gig, only freelancers can create gigs
const createGig = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      price,
      deliveryDays,
    } = req.body;

    // Ensure all required gig information has been supplied
    if (
      !title ||
      !description ||
      !category ||
      price === undefined ||
      deliveryDays === undefined
    ) {
      return res.status(400).json({
        message: "Please provide all required gig information.",
      });
    }

    // Use the authenticated user's ID 
    const freelancerId = req.user._id;

    // Confirm that the authenticated user still exists and has the freelancer role
    const freelancer = await User.findById(freelancerId);

    if (!freelancer || freelancer.role !== "freelancer") {
      return res.status(403).json({
        message: "Only registered freelancers can create gigs.",
      });
    }
    const gig = await Gig.create({
      title,
      description,
      category,
      price,
      deliveryDays,
      freelancer: freelancerId,
    });

    return res.status(201).json({
      message: "Gig created successfully.",
      gig,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("Error creating gig:", error.message);

    return res.status(500).json({
      message: "Server error while creating the gig.",
    });
  }
};

//PUT: update an existing gig, a freelancer can update their own gig. An admin can update any gig
const updateGig = async (req, res) => {
  try {
    // Find the gig by its ID
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found.",
      });
    }

    const isOwner =
      gig.freelancer.toString() === req.user._id.toString();

    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You can only update your own gigs.",
      });
    }

    // Only allow fields that belong to the Gig model
    const allowedFields = [
      "title",
      "description",
      "category",
      "price",
      "deliveryDays",
      "isActive",
    ];

    allowedFields.forEach((field) => {
      if (Object.prototype.hasOwnProperty.call(req.body, field)) {
        gig[field] = req.body[field];
      }
    });

    // Save changes
    const updatedGig = await gig.save();

    return res.status(200).json({
      message: "Gig updated successfully.",
      gig: updatedGig,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid gig ID.",
      });
    }

    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }

    console.error("Error updating gig:", error.message);

    return res.status(500).json({
      message: "Server error while updating the gig.",
    });
  }
};

//DELETE: 
const deleteGig = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);

    if (!gig) {
      return res.status(404).json({
        message: "Gig not found.",
      });
    }

    // Prevent freelancers from deactivating another freelancer's gig
    const isOwner =
      gig.freelancer.toString() === req.user._id.toString();

    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({
        message: "You can only deactivate your own gigs.",
      });
    }

    gig.isActive = false;
    await gig.save();

    return res.status(200).json({
      message: "Gig deactivated successfully.",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        message: "Invalid gig ID.",
      });
    }

    console.error("Error deactivating gig:", error.message);

    return res.status(500).json({
      message: "Server error while deactivating the gig.",
    });
  }
};

module.exports = { getGigs, getGigById, createGig, updateGig,deleteGig,
};
