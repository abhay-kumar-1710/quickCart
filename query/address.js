"use server";
import { Address } from "@/models/address";
import { User } from "@/models/user";

export async function getAddressByUserId(id) {
  try {
    const address = await Address.findOne({ userId: id })
      .populate({
        path: "userId",
        model: User,
      })
      .lean();
    return address;
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateAddress2(userId, dataToUpdate) {
  try {
    const updatedAddress = await Address.findOneAndUpdate(
      { userId: userId },
      dataToUpdate
    ).lean();
    if (!updatedAddress) {
      const createAddress = await Address.create(dataToUpdate).lean();
      return createAddress;
    }
    return updatedAddress;
  } catch (error) {
    throw new Error(error);
  }
}
