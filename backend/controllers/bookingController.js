//(Rudman, 2026)
const Booking = require("../models/bookingModel.js"); //import model to use it in controller
const Gig = require("../models/gigModel.js"); //import model to use it in controller
const mongoose = require("mongoose"); //import mongoose to use it in controller

//Create function for client to book a gig
const createBooking = async (req, res) => {
  try {
    const {gigId } = req.body; //check if all fields are entered

    // error message if empty field is found
    if (!gigId || !mongoose.Types.ObjectId.isValid(gigId)) {
      return res
        .status(400)
        .json({ message: "Please ensure you have selected the gig you want to book" });
    }

    //find the gig the client wants to book
    const gig = await Gig.findById(gigId);
    if (!gig) {
        return res
            .status(404)
            .json({ message: "The gig you are trying to book does not exist." });
    }

    // use the model to perform the required operation
    const booking = await Booking.create({
        client: req.user.id,
        gig: gig.id,
        freelancer: gig.freelancer,
        price: gig.price,
    });

    // return the booking object as json (code 201 - object created)
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Read (read ALL gigs)
const getAllBookings = async (req, res) => {
  try {
    // use th emodel to perform the required operation
    const filterBookings = 
     req.user.role === "freelancer"
        ? { freelancer: req.user.id }
        : { client: req.user.id };
 
    // only allow known status values to be used as a filter
    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (req.query.status) {
      if (!validStatuses.includes(req.query.status)) {
        return res.status(400).json({ message: "Invalid status filter." });
      }
      filterBookings.status = req.query.status;
    }

    //use model to perform operations
    const bookings = await Booking.find(filterBookings).populate("gig","title price");
    // convert the array of bookings, to a json array, and send to user
    return res.status(200).json(bookings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Read (read ONE booking)
const getBooking = async (req, res) => {
  try {
    // check if the required parameter exists, or if it is blank
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "An ID is required in order to get a booking." });
    }
    // perform the required operation using the model
    const booking = await Booking.findById(req.params.id).populate("gig", "title price",);
    // if a booking cannot be found using that ID (e.g., the ID is invalid, or just doesn't exist in the DB), return a 404
    if (!booking) {
      return res.status(404).json({
        message: "A booking with that ID does not exist in the collection.",
      });
    }
    // only view bookings that belong to them
    if (
      booking.client.toString() !== req.user.id && //client views their own bookings
      booking.freelancer.toString() !== req.user.id //freelancer views their own bookings
    ) {
      return res
        .status(403)
        .json({ message: "You are not allowed to view this booking." });
    }
    // if the booking IS found, return the booking
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Update a booking by changing the status
const updateBooking = async (req, res) => {
  try {
    // we make use of the parameters again, because the body will be used for the updated booking information
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "An ID is required in order to get a booking." });
    }
    // here, we check if any updated information is actually present in the body.
    // the model performs validation for us in this scenario, so we don't have to validate the presence of anything
    const {status} = req.body;

    if (status === undefined) {
      return res
        .status(400)
        .json({ message: "Please provide information to update the booking" });
    }

    //clients can only update the booking status
    if (status !== undefined && status !== "cancelled") {
      return res
        .status(400)
        .json({ message: "Only clients can update the booking status" });
    }

    // here, we use the model to perform the required operation
    // we pass the ID of the booking we want to update, the updated information, and some options
    const booking = await Booking.findById(req.params.id) ;
    // if the booking we want to update can't be found
    if (!booking) {
      return res
        .status(404)
        .json({ message: "No booking matching that ID in the collection" });
    }

    // a client may only update their own booking
    if (booking.client.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this booking." });
    }

    //a completed booking cannot be updated
    if (booking.status === "completed") {
        return res
            .status(400)
            .json({ message: "A completed booking cannot be changed." });
    }

    if (status !== undefined) booking.status = status;
    await booking.save(); //save updates to schema

    // return the updated booking
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//Delete booking
const deleteBooking = async (req, res) => {
  try {
    // parameter for the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "An ID is required in order to delete a booking." });
    }
    // use the model to perform the required operation
    const booking = await Booking.findById(req.params.id);
    // if booking wasn't found
    if (!booking) {
      return res
        .status(404)
        .json({ message: "No booking matching that ID in the collection" });
    }

    //client should only delete their own delete
    if (booking.client.toString() !== req.user.id) {
        return res
        .status(403)
        .json({ message: "Delete your own bookings only" });
        }

    //a completed booking cannot be deleted
    if (booking.status === "completed") {
        return res
            .status(400)
            .json({ message: "A completed booking cannot be deleted." });
        }
    //use model to perform operations
    await booking.deleteOne();
    // otherwise, return the deleted booking
    return res.status(200).json(booking);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// export all the methods to make them "public" (accessible in other files)
module.exports = {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  deleteBooking,
};

/*References

Rudman. G., 2026. BookController.js.(Version 1.0) [Source Code] Available at: < https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/bookController.js > [Accessed 11 October 2026]
*/