import mongoose from "mongoose";

const permissionSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: [true, "Permission key is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    module: {
      type: String,
      required: [true, "Module is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Permission", permissionSchema);
