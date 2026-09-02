/*rudderz243, 2026*/
//Imports moongoose 
const mongoose = require("mongoose");
//Imports bcryptjs to hash and salt the password
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    /*Stack Overflow, 2019 */
    minlength: 3,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["client", "freelancer", "admin"],
    default: "client",
  },
});

//This is a pre-save hook that will run before the user is saved to the database
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return; 
  }

  try {
    //Generates a salt and hashes the password for security purposes
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

  } catch (error) {
    /*Medium, 2024 */
    //Show an error message if the password hashing fails
    console.log("Error hashing password:", error);
    throw new Error("Error hashing password");
  }
});

// write a helper function to compare the user input when logging in (which is plain text), with the seasoned password
// in our database
userSchema.methods.matchPassword = async function (enteredPassword) {
  /// uses the compare method to compare (wow)
  return await bcrypt.compare(enteredPassword, this.password);
};

// export the model so that it can be used elsewhere :)
module.exports = mongoose.model("User", userSchema);

/*Reference List:
Medium. 2024. Mastering User Authentication: Building a Secure User Schema with Mongoose and Bcrypt. (Version 1.0) [Source Code]
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/controllers/authController.js> [Accessed 2 September 2026]. 
Stack Overflow. 2019. Mongoose schema: Validating unique field, case insensitive. (Version 1.0) [Source Code] Available at: <https://stackoverflow.com/questions/13991604/mongoose-schema-validating-unique-field-case-insensitive> [Accessed 2 September 2026].
 
*/