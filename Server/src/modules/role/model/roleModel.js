import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Role name is required"],
      trim: true,
      minlength: [2, "Role name must be at least 2 characters"],
      maxlength: [50, "Role name cannot exceed 50 characters"],
    },

    slug: {
      type: String,
      required: [true, "Role slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [2, "Role slug must be at least 2 characters"],
      maxlength: [50, "Role slug cannot exceed 50 characters"],
      match: [
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug can only contain lowercase letters, numbers, and hyphens",
      ],
    },

    description: {
      type: String,
      trim: true,
      maxlength: [200, "Description cannot exceed 200 characters"],
      default: "",
    },

    // permissions live in the Permission document, one per role

    isSystem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Role", roleSchema);
