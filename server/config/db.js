import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB);
    console.log(`Connected to MongoDB ${conn.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Error: ${error}`.bgRed.white);
  }
};

export default connectDB;
