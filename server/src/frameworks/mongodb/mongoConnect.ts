import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoURI = process.env.DATABASE_URL;

if (!mongoURI) {
  throw new Error("DATABASE_URL is not defined in .env");
}

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); 
  }
};

export default connectDB;
