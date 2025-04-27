import express from "express";
import Connection from "../Models/Connection.js";

const router = express.Router();

// Send a connection request
router.post("/request", async (req, res) => {
  const { email_user1, email_user2 } = req.body;

  try {
    // Check if a connection already exists
    const existingConnection = await Connection.findOne({
      $or: [
        { email_user1, email_user2 },
        { email_user1: email_user2, email_user2: email_user1 },
      ],
    });

    if (existingConnection) {
      return res.status(400).json({ message: "Connection already exists" });
    }

    // Create a new connection request
    const newConnection = new Connection({ email_user1, email_user2 });
    await newConnection.save();

    res.status(201).json({ message: "Connection request sent", connection: newConnection });
  } catch (err) {
    console.error("Error sending connection request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Accept a connection request
router.post("/accept", async (req, res) => {
  const { email_user1, email_user2 } = req.body;

  try {
    const connection = await Connection.findOneAndUpdate(
      { email_user1, email_user2, status: "pending" },
      { status: "connected", connectedAt: new Date() },
      { new: true }
    );

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    res.status(200).json({ message: "Connection request accepted", connection });
  } catch (err) {
    console.error("Error accepting connection request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Reject a connection request
router.post("/reject", async (req, res) => {
  const { email_user1, email_user2 } = req.body;

  try {
    const connection = await Connection.findOneAndUpdate(
      { email_user1, email_user2, status: "pending" },
      { status: "rejected" },
      { new: true }
    );

    if (!connection) {
      return res.status(404).json({ message: "Connection request not found" });
    }

    res.status(200).json({ message: "Connection request rejected", connection });
  } catch (err) {
    console.error("Error rejecting connection request:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch all connections for a user
router.get("/:userEmail", async (req, res) => {
  const { userEmail } = req.params;

  try {
    const connections = await Connection.find({
      $or: [{ email_user1: userEmail }, { email_user2: userEmail }],
    });

    res.status(200).json({ connections });
  } catch (err) {
    console.error("Error fetching connections:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;