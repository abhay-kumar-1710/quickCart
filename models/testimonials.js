import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema({
  review: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },

  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  reviewOnDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Testimonials =
  mongoose.models.Testimonials ||
  mongoose.model("Testimonials", testimonialSchema);
