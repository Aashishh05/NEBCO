import "dotenv/config";
import mongoose from "mongoose";
import Role from "../modules/role/model/roleModel.js";
import Permission from "../modules/permission/model/permissionModel.js";
import User from "../modules/auth/model/userModel.js";
import { logger } from "../utils/logger.js";
import { connectDB } from "../config/db.js";
import { PERMISSIONS } from "../constants/permissions.js";

// Every role in the system. Super Admin holds every permission.
const ROLES = [
  {
    name: "Super Admin",
    slug: "super-admin",
    description: "Full access to everything",
    isSystem: true,
    permissions: "all",
  },
  {
    name: "Administrator",
    slug: "admin",
    description: "Manages users, content and inbox",
    isSystem: false,
    permissions: [
      "dashboard:read",
      "projects:read",
      "projects:create",
      "projects:update",
      "projects:delete",
      "services:read",
      "services:update",
      "pages:read",
      "pages:update",
      "enquiries:read",
      "enquiries:update",
      "enquiries:delete",
      "appointments:read",
      "appointments:update",
      "appointments:delete",
      "testimonials:read",
      "testimonials:create",
      "testimonials:update",
      "testimonials:delete",
      "team:read",
      "team:create",
      "team:update",
      "team:delete",
      "media:read",
      "media:create",
      "media:delete",
      "users:read",
      "users:create",
      "users:update",
      "roles:read",
      "audit:read",
      "settings:read",
      "settings:update",
    ],
  },
  {
    name: "Content Editor",
    slug: "editor",
    description: "Edits pages, projects and media",
    isSystem: false,
    permissions: [
      "dashboard:read",
      "projects:read",
      "projects:create",
      "projects:update",
      "services:read",
      "pages:read",
      "pages:update",
      "testimonials:read",
      "testimonials:create",
      "testimonials:update",
      "team:read",
      "team:create",
      "team:update",
      "media:read",
      "media:create",
      "media:delete",
    ],
  },
  {
    name: "Sales",
    slug: "sales",
    description: "Handles enquiries and appointments",
    isSystem: false,
    permissions: [
      "dashboard:read",
      "enquiries:read",
      "enquiries:update",
      "appointments:read",
      "appointments:update",
      "projects:read",
      "services:read",
    ],
  },
  {
    name: "Viewer",
    slug: "viewer",
    description: "Read only access to the dashboard",
    isSystem: false,
    permissions: ["dashboard:read"],
  },
];

const allPermissions = Object.entries(PERMISSIONS).flatMap(
  ([module, actions]) => actions.map((action) => `${module}:${action}`),
);

const seed = async () => {
  await connectDB();

  for (const [module, actions] of Object.entries(PERMISSIONS)) {
    for (const action of actions) {
      await Permission.findOneAndUpdate(
        { key: `${module}:${action}` },
        { key: `${module}:${action}`, module },
        { upsert: true, new: true },
      );
    }
  }
  logger.info(`Permissions seeded: ${allPermissions.length}`);

  for (const role of ROLES) {
    const permissions =
      role.permissions === "all" ? allPermissions : role.permissions;

    await Role.findOneAndUpdate(
      { slug: role.slug },
      {
        name: role.name,
        description: role.description,
        permissions,
        isSystem: role.isSystem,
      },
      { upsert: true, new: true },
    );
  }
  logger.info(`Roles seeded: ${ROLES.length}`);

  let user = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!user) {
    const superAdmin = await Role.findOne({ slug: "super-admin" });
    user = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      role: superAdmin._id,
    });
  }
  user.password = process.env.ADMIN_PASSWORD;
  await user.save();

  logger.info(`Seed done: ${user.email} (super-admin)`);
  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
