import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
  anchor: {
    type: String,
    default: "",
  },

  title: {
    type: String,
    required: [true, "Card title is required"],
    trim: true,
  },

  body: {
    type: String,
    default: "",
  },

  items: [String],
});

const serviceSchema = new mongoose.Schema(
  {
    navLabel: {
      type: String,
      required: [true, "Nav label is required"],
      trim: true,
    },

    name: {
      type: String,
      required: [true, "Service name is required"],
      trim: true,
    },

    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    tagline: {
      type: String,
      default: "",
    },

    intro: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: "",
    },

    accentColor: {
      type: String,
      default: "#b82026",
    },

    chips: [String],

    // Shown on the back face of the business tile.
    scopeBullets: [String],

    cta: {
      type: String,
      default: "",
    },

    // The inner page's scope cards ("Design & Build", "Build from existing drawings", ...).
    cards: [cardSchema],

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

serviceSchema.index({ order: 1 });

export default mongoose.model("Service", serviceSchema);