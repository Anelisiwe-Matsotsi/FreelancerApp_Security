/*rudderz243, 2026*/
//Imports moongoose 
const mongoose = require("mongoose");

//Gives all the categories that a freelancer can assignto a gig
/*Geeksforgeeks, 2025 */
const gigCategories = [
    "Design",
    "Development",
    "Writing",
    "Marketing",
    "Video",
    "Music",
    "Other",
]

const gigSchema = new mongoose.Schema({
  title: { /*Stack Overflow, 2019 */
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  description: {
    type: String,
    required: true, 
    trim: true,
    minlength: 10,
    maxlength: 1000,
  },
  category: {
    type: String,
    required: true,
    enum: gigCategories,
  },
  //price in rand, setting a minimum of 1 stops peoplw from making free gigs.
  price: {
    type: Number,
    required: true, 
    min: 1,
    max: 100000,
  },
  /*Harshdixit, 2023 */
  //the owner of the gig, this is always set from the logged in user
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  /*Stack Overflow, 2016 */
  deliveryDays: {
    type: Number,
    required: true,
    min: 1,
    max: 90,
    validate: {
        validator: Number.isInteger,
        message: "Delivery days must be a whole number between 1 and 90",
    },
  },

  isActive: {
    type: Boolean,
    default: true,
  },
},
{
      timestamps: true,
},
);


//Export the gig model
module.exports = mongoose.model("Gig", gigSchema);

/*Reference List:
Geeksforgeeks. 2025.How to Create and Use Enum in Mongoose.(Version 1.0) [Source code] Available at:<https://www.geeksforgeeks.org/mongodb/how-to-create-and-use-enum-in-mongoose/> [Accessed 10 October 2026].
Harshdixit. 2023. Making an Cart API system(Using MERN ) No more Redux. (Version 1.0) [Source code] Available at:<https://medium.com/@harshdixit1981/making-an-cart-api-system-using-mern-no-more-redux-b8ee4aec87c0> [Accessed 10 October 2026].
rudderz243. 2026. bookModel.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/models/bookModel.js> [Accessed 2 September 2026]. 
Stack Overflow. 2019. Mongoose schema: Validating unique field, case insensitive. (Version 1.0) [Source Code] Available at: <https://stackoverflow.com/questions/13991604/mongoose-schema-validating-unique-field-case-insensitive> [Accessed 2 September 2026].
Stack Overflow. 2016. Validate integer values with mongoose. (Version 1.0) [Source code] Available at:<https://stackoverflow.com/questions/37711302/validate-integer-values-with-mongoose> [Accessed 10 October 2026].
*/