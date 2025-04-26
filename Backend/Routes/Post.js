import express from "express";
import Post from "../Models/Post.js";

const router = express.Router();

// Create a new post
router.post("/create", async (req, res) => {
  const { email, postType, content, skills } = req.body;

  try {
    // Validate required fields
    if (!email || !postType || !content) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new post
    const newPost = new Post({
      email,
      postType,
      content,
      skills,
      createdAt: new Date(),
    });

    // Save the post to the database
    await newPost.save();

    res.status(201).json({ message: "Post created successfully", post: newPost });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;