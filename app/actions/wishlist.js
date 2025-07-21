'use server'
import { toggleWishlistQuery, wishlistDeleteQuery } from "@/query/wishlist";


export async function toggleWishlistAction(userId, productId, wishListValue) {
  toggleWishlistQuery(userId, productId, wishListValue);
}

export async function wishlistDeleteAction(userId, productId) {
  wishlistDeleteQuery(userId, productId)
}