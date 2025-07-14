import express from "express";
import Event from "../models/Event.js";
import { upload } from "../config/multer.js";
import fs from "fs";

const router = express.Router();

// Create event with image upload
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const eventData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category || "academic",
      status: req.body.status || "upcoming",
    };

    // If image is uploaded, store buffer directly
    if (req.file) {
      eventData.image = {
        data: req.file.buffer, // Use buffer instead of reading file
        contentType: req.file.mimetype,
      };
    }

    const event = new Event(eventData);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single event
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update event
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      category: req.body.category,
      status: req.body.status,
    };

    // If new image is uploaded, update with binary data
    if (req.file) {
      updateData.image = {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      };
      // Clean up the temporary file
      fs.unlinkSync(req.file.path);
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete event
router.delete("/:id", async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get event image
router.get("/:id/image", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event || !event.image || !event.image.data) {
      return res.status(404).json({ message: "Image not found" });
    }

    res.set("Content-Type", event.image.contentType);
    res.send(event.image.data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
