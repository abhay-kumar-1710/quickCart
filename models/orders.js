import mongoose from "mongoose";

const ordersSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  orderDate : {
    type : Date,
    default : Date.now(),
    required : true
  }
});

export const Order =
  mongoose.models.Order || mongoose.model("Order", ordersSchema);