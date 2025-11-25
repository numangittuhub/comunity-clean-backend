import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    image: { type: String },
    userId: { type: String }, // ইউজারের id
  },
  { timestamps: true }
);

export default mongoose.model("Issue", issueSchema);
