"use server";

import { updateAddress2 } from "@/query/address";

export async function updateAddress(userId, dataToUpdate) {
  updateAddress2(userId, dataToUpdate);
}
