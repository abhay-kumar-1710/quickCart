import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  streetName: {
    type: String,
    required: false,
  
  },
  landMark: {
    type: String,
    required: false,
  
  },

  city: {
    type: String,
    required: false,

  },
  pinCode: {
    type: Number,
    required: true,

  },
  state: {
    type: String,
    required: false,
   
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

export const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);