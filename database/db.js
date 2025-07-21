import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DATABASE CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log("FAILED TO CONNECT DATABASE", error);
  }
}
