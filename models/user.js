import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 5-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// The models object is provided by the mongoose library and stores all the registered models.

// If a model named "User" already exists in the "models" object, it assigns that existing model to the "User" variable.

// This prevents redefining the model and ensures that the existing model is reused.

//If a model named "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model.

//the newly created model is then assigned to "User" variable.

//We did this additional check as this route will only be active when a request is made to this route!
const User = models.User || model("User", userSchema);
export default User;
