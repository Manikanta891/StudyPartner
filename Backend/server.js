import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";
import authRoutes from "./Routes/Auth.js";
import postRoutes from "./Routes/Post.js"; // Import Post routes
import userRoutes from "./Routes/User.js"; // Import User routes
import photoRoutes from "./Routes/photo.js"; // Import photo routes
import { checkCloudinaryConnection } from "./Config/cloudinary.js"; // Import Cloudinary check function

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); // Auth routes
app.use("/api/posts", postRoutes); // Post routes
app.use("/api/users", userRoutes); // User routes
app.use("/api/photo", photoRoutes); // Register photo routes

// Endpoint to check Cloudinary connection
app.get("/api/cloudinary/check", async (req, res) => {
  const isConnected = await checkCloudinaryConnection();
  if (isConnected) {
    res.status(200).json({ message: "Cloudinary is connected" });
  } else {
    res.status(500).json({ message: "Failed to connect to Cloudinary" });
  }
});

app.get("/", (req, res) => {
  res.send("Study Buddy Backend is Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
