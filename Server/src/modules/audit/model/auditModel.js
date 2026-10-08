import mongoose from "mongoose";

const auditSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    userEmail: {
      type: String,
      default: "",
    },

    action: {
      type: String,
      required: [true, "Action is required"],
      trim: true,
    },

    resource: {
      type: String,
      default: "",
      trim: true,
    },

    resourceId: {
      type: String,
      default: "",
    },

    ip: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("AuditLog", auditSchema);
