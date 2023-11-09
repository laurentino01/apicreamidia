import mongoose from "mongoose";

const { Schema } = mongoose;

const dumpSchema = new Schema({
  _id: String,
  url: String,
  image: String,

  highlight: Boolean,
  dateCreate: { type: Date, default: Date.now },
});

export const dumpModel = mongoose.model("dumpSchema", dumpSchema);
