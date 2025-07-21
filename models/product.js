import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  categoryId: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
  testimonials: {
    type: [mongoose.Schema.ObjectId],
    ref: "Testimonials",
  },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);