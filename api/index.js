//todo  NEED TO MAKE IT AS MVC STRUCTURE LATER
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jwt from "jsonwebtoken";
import { authenticateToken, hashPassword, comparePasswords } from "./utils.js";
import { User } from "./models/userModel.js";
import { Note } from "./models/noteModel.js";
// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// Database connection
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Successfully connected to the database 🟢");
  } catch (err) {
    console.error(`Failed to connect to the database 🔴: ${err.message}`);
    process.exit(1);
  }
};
//! auth end points
// Create account route
app.post("/create-account", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        message: "Email is already in use. Please choose another one.",
      });
    }

    // Hash the password before storing
    const hashedPassword = await hashPassword(password); // Ensure bcrypt is used

    // Create the new user
    const newAccount = await User.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Create JWT token
    const accessToken = jwt.sign(
      { id: newAccount._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "5000m", // Token valid for 1 hour
      }
    );

    // Return success response
    res.status(201).json({
      status: "success",
      data: {
        user: {
          fullName: newAccount.fullName,
          email: newAccount.email,
          _id: newAccount._id,
        },
      },
      accessToken,
      message: "Account created successfully",
    });
  } catch (err) {
    // Handle any error that occurs
    res.status(500).json({
      status: "fail",
      message: `Error: ${err.message}`,
    });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid email or password" });
    }

    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ status: "fail", message: "Invalid email or password" });
    }

    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3600m",
    });

    res.status(200).json({
      status: "success",
      accessToken,
      message: "Login successful",
    });
  } catch (err) {
    res.status(500).json({ status: "fail", message: `Error: ${err.message}` });
  }
});

app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Make sure to use id if that's how it's stored in the JWT
    console.log("Looking for user with ID:", userId); // Log the user ID being searched

    const user = await User.findById(userId); // Use findById for clarity
    console.log("The user is:", user); // Log user details

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      status: "success",
      user: {
        fullName: user.fullName,
        email: user.email,
        _id: user._id,
        createOn: user.createOn, // Ensure the field name is correct
      },
    });
  } catch (err) {
    console.error("Error retrieving user:", err.message); // Log error for debugging
    return res.status(500).json({
      message: "An error occurred while retrieving user information.",
      error: err.message, // Include error message for debugging (optional)
    });
  }
});

//! notes end points
app.post("/add-note", authenticateToken, async (req, res) => {
  const { title, content, tags } = req.body;
  const userId = req.user.id; // Access user ID directly from req.user

  try {
    // Ensure userId is available
    if (!userId) {
      return res.status(401).json({
        status: "fail",
        message: "User not authenticated",
      });
    }

    const note = await Note.create({
      title,
      content,
      tags: tags || [],
      userId: userId, // Use userId directly
    });

    res.status(200).json({
      status: "success",
      data: {
        note,
      },
    });
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: `error due to ${err.message}`,
    });
  }
});
app.patch("/edit-note/:noteId", authenticateToken, async (req, res) => {
  const noteId = req.params.noteId;
  const { content, title, isPinned, tags } = req.body;
  const userId = req.user.id; // Get the user ID directly

  // Check if there are changes
  if (!content && !title && !isPinned && !tags) {
    return res.status(400).json({
      status: "fail",
      message: "nothing has changed",
    });
  }

  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: noteId, userId },
      {
        content,
        title,
        isPinned,
        tags,
      },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedNote) {
      return res.status(404).json({
        status: "fail",
        message: "note not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        note: updatedNote,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `error due to ${err.message}`,
    });
  }
});

app.get("/allNotes", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id; // Get the user ID from the authenticated user
    const notes = await Note.find({ userId }).sort({ isPinned: -1 }); // Use userId in the query
    if (notes.length === 0) {
      // Check if notes array is empty
      return res.status(404).json({
        status: "fail",
        message: "no notes found",
      });
    }
    res.status(200).json({
      status: "success",
      data: {
        notes,
      },
    });
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: `fail due to this error ${err.message}`,
    });
  }
});
app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const userId = req.user.id;
    const deleteNote = await Note.findOneAndDelete({ _id: noteId, userId });
    if (!deleteNote) {
      return res.status(404).json({
        status: "fail",
        message: "note is not found :(",
      });
    }
    res.status(200).json({
      status: "success",
      message: "note deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: `fail because of ${err.message}`,
    });
  }
});
app.patch(
  "/update-note-pinned/:noteId",
  authenticateToken,
  async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const userId = req.user.id; // Get the user ID directly

    // Check if there are changes
    if (!isPinned) {
      return res.status(400).json({
        status: "fail",
        message: "nothing has changed",
      });
    }

    try {
      const updatedPinNote = await Note.findOneAndUpdate(
        { _id: noteId, userId },
        {
          isPinned,
        },
        { new: true, runValidators: true } // Return the updated document and run validators
      );

      if (!updatedPinNote) {
        return res.status(404).json({
          status: "fail",
          message: "note not found",
        });
      }

      res.status(200).json({
        status: "success",
        data: {
          note: updatedPinNote,
        },
      });
    } catch (err) {
      res.status(500).json({
        status: "fail",
        message: `error due to ${err.message}`,
      });
    }
  }
);
// Start server and connect to database
app.listen(port, async () => {
  console.log(`Server is running on port ${port} 🚀`);
  await connectionDB();
});
