import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    client: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },

    role: {
      type: String,
      default: "",
      trim: true,
    },

    quote: {
      type: String,
      required: [true, "Quote is required"],
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },

    avatar: {
      type: String,
      default: "",
    },

    order: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Testimonial", testimonialSchema);