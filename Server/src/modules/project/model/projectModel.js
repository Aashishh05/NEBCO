import mongoose from "mongoose";

const mediaImageSchema = new mongoose.Schema({
  publicId: { type: String, default: "" },
  url: { type: String, default: "" },
});

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["residential", "commercial", "hospitality"],
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      default: "",
      trim: true,
    },

    link: {
      type: String,
      default: "",
    },

    image: mediaImageSchema,

    gallery: [mediaImageSchema],

    summary: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

projectSchema.index({ category: 1, order: 1 });

export default mongoose.model("Project", projectSchema);