import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    phones: [String],

    address: {
      type: String,
      default: "",
      trim: true,
    },

    socials: {
      facebook: { type: String, default: "" },
      instagram: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      youtube: { type: String, default: "" },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Contact", contactSchema);