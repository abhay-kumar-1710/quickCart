"use server";

import { getUserByEmail } from "@/query/user";
import { getServerSession } from "next-auth";

export async function getLoggedInUser() {
  const session = await getServerSession();
  if (!session?.user) return null;
  return getUserByEmail(session?.user?.email);
}
