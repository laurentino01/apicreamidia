import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  name: String,
  email: String,
  password: String,
  role: String,
  dateCreate: { type: Date, default: Date.now },
});

export const userModel = mongoose.model("userModel", userSchema);
