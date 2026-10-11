//(Rudman, 2026)
//import mongoose
const mongoose = require("mongoose");

// creating schema
//(Stack Overflow, 2019)
const bookingSchema = new mongoose.Schema(
  {
    //(StackOverflow, 2022)
    gig: { //gig that is being booked
      type: mongoose.Schema.Types.ObjectId,
      ref:"Gig",
      required: true,
    },
    freelancer: { //the freelancer being booked
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    client: { //the clients ID thats making the booking
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    //(StackOverflow, 2022)
    status: {
      type: String,
      enum: [
        "confirmed",
        "pending",
        "completed",
        "cancelled",
      ],
      default:"confirmed", //payment is simulated
      trim: true,
    },
  },
  {
    timestamps: true, //timestamps creeated createdAt and updatedAt fields in schema
  },
);

//convert the schema into a model to use it in controller
const Booking = mongoose.model("Booking", bookingSchema);

// export all the methods to make them public for other files to use it
module.exports = Booking;

/*References

Rudman. G., 2026. BookModel.js.(Version 1.0) [Source Code] Available at: < https://github.com/rudderz243/insy7314-library/blob/master/backend/models/bookModel.js > [Accessed 11 October 2026]. 
StackOverflow, 2022. What is node package walker. (Version 1.0) [Source Code] Available at: < https://stackoverflow.com/questions/72892705/what-is-node-package-walker > [Accessed 11 October 2026]
Stack Overflow. 2019. Mongoose schema: Validating unique field, case insensitive. (Version 1.0) [Source Code] Available at: <https://stackoverflow.com/questions/13991604/mongoose-schema-validating-unique-field-case-insensitive> [Accessed 2 September 2026].
*/