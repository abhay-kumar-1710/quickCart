"use server";

import {
  addToCartDeleteQuery,
  addToCartQuery,
  getUserCartProducts,
  updateQuantityFromCartQuery,
} from "@/query/addtocart";

export async function addToCartAction(productId, loggedInUser, quantity) {
  addToCartQuery(productId, loggedInUser, quantity);
}

export async function addToCartDeleteAction(userId, productId) {
  addToCartDeleteQuery(userId, productId);
}

export async function updateQuantityFromCartAction(userId, productId, value) {
  updateQuantityFromCartQuery(userId, productId, value);
}

