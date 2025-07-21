
import { Cart } from "@/models/cart";
import { Category } from "@/models/category";
import { Product } from "@/models/product";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function addToCartQuery(productId, loggedInUser, quantity) {


  try {
  
     const cart = Cart.create({
       userId: loggedInUser,
       productId: productId,
       quantity: quantity,
     });

     return cart;
   
   
  } catch (error) {
    throw new Error(error);
  }
}

export async function findProductInCart(productId, userId) {
  try {
    const cartItem = Cart.findOne({
      productId,
      userId,
    });

    return cartItem;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserCartProducts(userId) {
  try {
    const cartItems = await Cart.find({ userId: userId })
      .populate({
        path: "productId",
        model: Product,
        populate: {
          path: "categoryId",
          model: Category,
        },
      })
      .populate({
        path: "userId",
        model: User,
      })
      .lean();
    return cartItems;
  } catch (error) {
    throw new Error(error);
  }
}

export async function addToCartDeleteQuery(userId, productId) {
  try {
    const cartItems = await Cart.findOneAndDelete({ userId, productId }).lean();
   
    return cartItems;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateQuantityFromCartQuery(userId, productId, value) {
  // console.log(userId, productId, value);
  try {
    const filter = { userId: userId, productId: productId };
    const cartItem = await Cart.findOneAndUpdate(filter, {
      quantity: value,
    }).lean();
    
    return cartItem;
  } catch (error) {
    throw new Error(error);
  }
}
