/*rudderz243, 2026*/
//Imports moongoose 
const mongoose = require("mongoose");
//Imports bcryptjs to hash and salt the password
const bcrypt = require("bcryptjs");


const userSchema = new mongoose.Schema({
  username: { /*Stack Overflow, 2019 */
    type: String,
    required: true,
    trim: true,
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
    throw new Error("Error hashing password");
  }
});

// A function used to compare an entered password with the hashed password stored in the database for a user
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Export the user model
module.exports = mongoose.model("User", userSchema);

/*Reference List:
Medium. 2024. Mastering User Authentication: Building a Secure User Schema with Mongoose and Bcrypt. (Version 1.0) [Source Code] Available at: <https://medium.com/@finnkumar6/mastering-user-authentication-building-a-secure-user-schema-with-mongoose-and-bcrypt-539b9394e5d9> [Accessed 2 September 2026].
rudderz243. 2026. authController.(Version 1.0) [Source Code] Available at: <https://github.com/rudderz243/insy7314-library/blob/master/backend/models/userModel.js> [Accessed 2 September 2026]. 
Stack Overflow. 2019. Mongoose schema: Validating unique field, case insensitive. (Version 1.0) [Source Code] Available at: <https://stackoverflow.com/questions/13991604/mongoose-schema-validating-unique-field-case-insensitive> [Accessed 2 September 2026].
 
*/