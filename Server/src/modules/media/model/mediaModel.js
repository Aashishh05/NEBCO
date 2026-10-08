import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    publicId: {
      type: String,
      required: [true, "publicId is required"],
      unique: true,
    },

    url: {
      type: String,
      required: [true, "URL is required"],
    },

    fileName: {
      type: String,
      default: "",
    },

    size: {
      type: Number,
      default: 0,
    },

    mimeType: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Media", mediaSchema);