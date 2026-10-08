import mongoose from "mongoose";

// Generic text blocks: one document per page section (hero, footer, about, ...).
// `data` is free-form, the shape lives in the seed and the admin form.
const pageSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Page key is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    label: {
      type: String,
      required: [true, "Label is required"],
      trim: true,
    },

    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Page", pageSchema);