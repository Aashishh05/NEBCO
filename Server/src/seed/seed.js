import 'dotenv/config';
import mongoose from 'mongoose';
import Role from '../modules/role/model/roleModel.js';
import User from '../modules/auth/model/userModel.js';
import { logger } from '../utils/logger.js';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Role from '../modules/role/model/roleModel.js';
import User from '../modules/auth/model/userModel.js';
import { logger } from '../utils/logger.js';

// Safe to run more than once: it updates the existing role and admin user.
const seed = async () => {
  await connectDB();

  const role = await Role.findOneAndUpdate(
    { slug: 'super-admin' },
    { name: 'Super Admin', slug: 'super-admin', description: 'Full access', permissions: [], isSystem: true },
    { upsert: true, new: true }
  );

  let user = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!user) {
    user = new User({ name: process.env.ADMIN_NAME, email: process.env.ADMIN_EMAIL, role: role._id });
  }
  user.password = process.env.ADMIN_PASSWORD;
  await user.save();

  logger.info(`Seed done: ${user.email} (${role.name})`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
