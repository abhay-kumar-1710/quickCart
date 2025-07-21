import { Category } from "@/models/category";

export async function getAllCategory() {
  try {
    const categories = await Category.find({}).lean();
    return categories;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getCategoryById(id) {
  try {
    const category = await Category.findOne({ _id: id }).lean();
    return category;
  } catch (error) {
    throw new Error(error);
  }
}
