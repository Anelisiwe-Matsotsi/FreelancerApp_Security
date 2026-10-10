/*rudderz243, 2026*/
//Imports moongoose 
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  reference: { /*Stack Overflow, 2019 */
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  /*Harshdixit, 2023 */
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
    unique: true,
  },
  gig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Gig",
    required: true,
  },
  
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  gigTitle: {
    type: String,
    required: true,
  },
  /*Stack Overflow, 2016 */
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  currency: {
    type: String,
    default: "ZAR",
  },

  /*Geeksforgeeks, 2025 */
  status: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Completed",
  },
},
{
      timestamps: true,
},
);


//Export the gig model
module.exports = mongoose.model("Transaction", transactionSchema);

/*Reference List:
Geeksforgeeks. 2025.How to Create and Use Enum in Mongoose.(Version 1.0) [Source code] Available at:<https://www.geeksforgeeks.org/mongodb/how-to-create-and-use-enum-in-mongoose/> [Accessed 10 October 2026].
Harshdixit. 2023. Making an Cart API system(Using MERN ) No more Redux. (Version 1.0) [Source code] Available at:<https://medium.com/@harshdixit1981/making-an-cart-api-system-using-mern-no-more-redux-b8ee4aec87c0> [Accessed 10 October 2026].
rudderz243. 2026. bookModel.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/models/bookModel.js> [Accessed 2 September 2026]. 
Stack Overflow. 2019. Mongoose schema: Validating unique field, case insensitive. (Version 1.0) [Source Code] Available at: <https://stackoverflow.com/questions/13991604/mongoose-schema-validating-unique-field-case-insensitive> [Accessed 2 September 2026].
*/