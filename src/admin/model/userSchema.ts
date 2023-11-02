import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: String,
  email: String,
  password: String,
  toobox: [{ id: String, type: String }],
  dateCreate: { type: Date, default: Date.now },
});

export const userModel = mongoose.model("userModel", userSchema);
