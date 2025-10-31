// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import app from "./app.js";

// dotenv.config();

// const PORT = process.env.PORT || 5000;

// async function main() {
//   try {
//     console.log("Connecting to MongoDB...");
//     await mongoose.connect(
//       `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z68se.mongodb.net/feriBazar?retryWrites=true&w=majority&appName=Cluster0`
//     );
//     console.log("MongoDB connected successfully!");

//     if (process.env.NODE_ENV !== "production") {
//       app.listen(PORT, () => {
//         console.log(`App listening on port ${PORT}`);
//       });
//     }
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error.message);
//   }
// }
// main();

import serverless from "serverless-http";
import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

// MongoDB connection (serverless safe)
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.z68se.mongodb.net/feriBazar?retryWrites=true&w=majority&appName=Cluster0`
    );
    isConnected = true;
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw err;
  }
}

// Export serverless handler
export default async function handler(req, res) {
  await connectDB();
  return app(req, res);
}

// Wrap app for Vercel serverless
export const api = serverless(app);
