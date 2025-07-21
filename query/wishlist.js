import { Product } from "@/models/product";
import { Wishlist } from "@/models/wishlist";

export async function toggleWishlistQuery(userId, productId, wishListValue) {
  // console.log(userId, productId, wishListValue);

  try {
    if (wishListValue) {
      const wishlist = await Wishlist.create({
        userId,
        productId,
      });
      return wishlist;
    } else {
      const wishlist = await Wishlist.findOneAndDelete({
        userId,
        productId,
      });
      return wishlist;
    }
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserProductInWishlist(userId) {
  try {
    const wishlist = await Wishlist.find({ userId: userId })
      .populate({
        path : "productId",
        model: Product
      })
      .lean();
    return wishlist;
  } catch (error) {
    throw new Error(error);
  }
}

export async function findProductInWishlist(userId, productId) {
  try {
    const wishlist = Wishlist.findOne({userId: userId, productId:  productId})
    return wishlist
  } catch (error) {
    throw new Error(error);
  }
}


export async function wishlistDeleteQuery(userId, productId) {
    try {
      const wishlist = await Wishlist.findOneAndDelete({userId, productId}).lean()
      revalidatePath('/addtocart')
      return wishlist;
    } catch (error) {
      throw new Error(error);
    }
}