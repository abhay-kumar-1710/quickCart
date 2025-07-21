"use server";
import { sanitizeData } from "@/lib/sanitizeData";
import { User } from "@/models/user";
import { revalidatePath } from "next/cache";
import bcrypt from "bcryptjs";

export async function getUserByEmail(email) {
  try {
    const user = await User.findOne({ email: email }).lean();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}

export async function getUserDetailsUpdated2(email, dataToUpdate) {
  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      dataToUpdate
    ).lean();
    revalidatePath("/profile");
    return sanitizeData(user);
  } catch (error) {
    throw new Error(error);
  }
}

export async function updatePassword2(email, dataToUpdate) {
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User Not Found!");
  }

  const comparePassword = await bcrypt.compare(
    dataToUpdate.oldPassword,
    user?.password
  );

  if (!comparePassword) {
    throw new Error("Please Enter Correct Password!");
  }

  if (dataToUpdate.newPassword !== dataToUpdate.confirmNewPassword) {
    throw new Error("New Password and Confirm Password Does not match!");
  }

  const hashPassword = await bcrypt.hash(dataToUpdate.newPassword, 10);

  const updateData = {
    password: hashPassword,
  };

  try {
    const updateUserPassword = await User.findOneAndUpdate(
      { email: email },
      updateData
    ).lean();
    revalidatePath("/profile");
    return updateUserPassword;
  } catch (error) {
    throw new Error(error);
  }
}
