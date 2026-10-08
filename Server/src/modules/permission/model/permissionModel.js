import mongoose from "mongoose";

// One action inside a module: read / create / update / delete.
const modulePermissionSchema = new mongoose.Schema({
  read: { type: Boolean, default: false },
  create: { type: Boolean, default: false },
  update: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
});

// One document per role holding the whole permission matrix.
const permissionSchema = new mongoose.Schema(
  {
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: [true, "Role is required"],
      unique: true,
    },

    modules: {
      type: Map,
      of: modulePermissionSchema,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Permission", permissionSchema);
