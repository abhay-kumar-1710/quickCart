import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryDescription: {
    type: String,
    required: false,
  },
  categoryImage: {
    type: String,
    required: true,
  },
});

export const Category =
  mongoose.models.Category || mongoose.model("Category", categorySchema);