import { connectDB } from "@/database/db";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";

export async function POST(request) {
  await connectDB();

  const { firstName, lastName, role, email, password, confirmPassword } =
    await request.json();

  if (
    !firstName ||
    !lastName ||
    !role ||
    !email ||
    !password ||
    !confirmPassword
  ) {
    return Response.json({ message: "All Fields are Required!" });
  }

  if (password !== confirmPassword) {
    return Response.json({ message: "Password Does Not Match" });
  }

  try {
    const existUser = await User.findOne({ email });

    if (existUser) {
      return Response.json({ message: "User already exist!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });

    return Response.json({ message: "User Registered Successfully!", newUser });
  } catch (error) {
    console.log("ERROR IN SIGN UP", error);
    return new Error(error);
  }
}
