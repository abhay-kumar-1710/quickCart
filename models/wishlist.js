import mongoose from "mongoose";

const wishListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
});

export const Wishlist =
  mongoose.models.Wishlist || mongoose.model("Wishlist", wishListSchema);
