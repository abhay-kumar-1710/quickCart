"use server";

import { createReview } from "@/query/testimonials";

export async function postReview(userId, productId, formData) {
  createReview(userId, productId, formData);
}
