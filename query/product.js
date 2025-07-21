import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { Testimonials } from "@/models/testimonials";
import { User } from "@/models/user";

export async function getAllProducts() {
  try {
    const products = await Product.find()
      .populate({
        path: "categoryId",
        model: Category,
      })
      .lean();
    return products;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getProductsByCategoryId(cId) {
  try {
    const products = await Product.find({ categoryId: cId })
      .populate({
        path: "categoryId",
        model: Category
      })
      .lean();
    return products;
  } catch (error) {
    throw new Error(error);
  }
}


export async function getProductsById(id) {
  try {
    const products = await Product.findById(id)
      .populate({
        path: "categoryId",
        model: Category,
      })
      .populate({
        path: "testimonials",
        model: Testimonials,
        populate: {
          path: "userId",
          model: User,
        },
       
      })
      .lean();
      return products
  } catch (error) {
     throw new Error(error);
  }
}