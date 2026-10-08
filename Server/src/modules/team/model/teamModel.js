import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    position: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
    },

    photo: {
      publicId: { type: String, default: "" },
      url: { type: String, default: "" },
    },

    socials: {
      facebook: { type: String, default: "" },
      linkedin: { type: String, default: "" },
      x: { type: String, default: "" },
      instagram: { type: String, default: "" },
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

export default mongoose.model("TeamMember", teamSchema);