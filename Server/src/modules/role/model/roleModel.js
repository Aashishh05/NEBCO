import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    description: { type: String, default: '' },
    permissions: [{ type: String }],
    isSystem: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export default mongoose.model('Role', roleSchema);
