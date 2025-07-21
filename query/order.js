import { Cart } from "@/models/cart";
import { Order } from "@/models/orders";
import { Product } from "@/models/product";



export async function addOrder(userId, productId) {
  try {
    const orders = await Order.create({
      userId,
      productId,
    });
   
    return orders;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserOrders(userId) {
  try {
    const orders = await Order.find({ userId })
      .populate({ path: "productId", model: Product })
      .lean();
    return orders;
  } catch (error) {
    throw new Error(error);
  }
}

export async function buyNowTypeAddToCart(userId) {
  // console.log("order query", userId);
  
  try {
    const userCartItems = await Cart.find({ userId: userId }).lean();
    // console.log("userCartItems", userCartItems);
    const createOrderThroughCartItems = userCartItems.map((cartItem) =>
      Order.create({
        userId: cartItem?.userId?._id,
        productId: cartItem?.productId?._id,
        orderDate: Date.now(),
      })
    );
    const deleteUserCartItems = userCartItems.map(
      async (uId) => await Cart.findOneAndDelete({ userId: uId?.userId?._id })
    );
    // 

    return createOrderThroughCartItems;
  } catch (error) {
       throw new Error(error);
  }
}