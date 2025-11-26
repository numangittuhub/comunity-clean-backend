import express from "express";
import Issue from "../models/Issue.js";

const router = express.Router();

// GET: সব issues
router.get("/", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: user-wise issues (My Issues)
router.get("/my/:userId", async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.params.userId }).sort({ createdAt: -1 });
    res.json(issues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: নতুন issue add (Add Issue)
router.post("/", async (req, res) => {
  const { title, category, location, description, amount, image, userId } = req.body;
  try {
    const newIssue = new Issue({ title, category, location, description, amount, image, userId });
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH: update existing issue
router.patch("/:id", async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedIssue);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: delete an issue
router.delete("/:id", async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.json({ message: "Issue deleted successfully!" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET: user contribution (total amount donated)
router.get("/contribution/:userId", async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.params.userId });
    const totalContribution = issues.reduce((sum, issue) => sum + (issue.amount || 0), 0);
    res.json({ totalContribution, issues });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
