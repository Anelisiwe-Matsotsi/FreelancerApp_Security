//(Rudman, 2026)
const Booking = require("../models/bookingModel.js"); //import model to use it in controller
const Gig = require("../models/gigModel.js"); //import model to use it in controller
const mongoose = require("mongoose"); //import mongoose to use it in controller
//the transaction helpers already exist in transactionController, they just were not being called
const {
  createTransactionForBooking,
  refundTransactionForBooking,
} = require("./transactionController.js");

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

    //payments are simulated, so the transaction record is created as soon as the booking is made
    try {
      await createTransactionForBooking({
        bookingId: booking._id,
        gig,
        clientId: req.user.id,
      });
    } catch (transactionError) {
      //no booking without a payment record, so undo the booking if the transaction failed
      await booking.deleteOne();
      return res.status(400).json({ message: transactionError.message });
    }

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
    //freelancers see bookings on their gigs, admins see all bookings, clients see their own
    let filterBookings = { client: req.user.id };
    if (req.user.role === "freelancer") filterBookings = { freelancer: req.user.id };
    if (req.user.role === "admin") filterBookings = {};
 
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
//client: pending/confirmed -> cancelled
//freelancer: pending -> confirmed, confirmed -> completed, pending/confirmed -> cancelled (decline)
const updateBooking = async (req, res) => {
  try {
    // we make use of the parameters again, because the body will be used for the updated booking information
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(400)
        .json({ message: "An ID is required in order to get a booking." });
    }

    const { status } = req.body;

    if (status === undefined) {
      return res
        .status(400)
        .json({ message: "Please provide information to update the booking" });
    }

    //which statuses each role is allowed to set
    const allowedStatuses = {
      client: ["cancelled"],
      freelancer: ["confirmed", "completed", "cancelled"],
    };
    if (!allowedStatuses[req.user.role]?.includes(status)) {
      return res
        .status(400)
        .json({ message: `A ${req.user.role} cannot set a booking to ${status}.` });
    }

    const booking = await Booking.findById(req.params.id);
    // if the booking we want to update can't be found
    if (!booking) {
      return res
        .status(404)
        .json({ message: "No booking matching that ID in the collection" });
    }

    // a user may only update a booking that belongs to them
    const owner = req.user.role === "client" ? booking.client : booking.freelancer;
    if (owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You are not allowed to update this booking." });
    }

    //completed and cancelled bookings are finished
    if (booking.status === "completed" || booking.status === "cancelled") {
      return res
        .status(400)
        .json({ message: `A ${booking.status} booking cannot be changed.` });
    }

    //the work must be confirmed before it can be completed
    if (status === "confirmed" && booking.status !== "pending") {
      return res.status(400).json({ message: "Only a pending booking can be confirmed." });
    }
    if (status === "completed" && booking.status !== "confirmed") {
      return res.status(400).json({ message: "Confirm the booking before completing it." });
    }

    booking.status = status;
    await booking.save(); //save updates to schema

    //a cancelled booking is refunded
    if (status === "cancelled") {
      await refundTransactionForBooking(booking._id);
    }

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