import "dotenv/config";
import mongoose from "mongoose";
import Role from "../modules/role/model/roleModel.js";
import Permission from "../modules/permission/model/permissionModel.js";
import User from "../modules/auth/model/userModel.js";
import { logger } from "../utils/logger.js";
import { connectDB } from "../config/db.js";
import ROLES from "../constants/rolesConstant.js";
import MODULES from "../constants/modulesConstant.js";
import { ACTIONS, perm } from "../constants/permissionsConstant.js";
import Service from "../modules/service/model/serviceModel.js";
import Contact from "../modules/contact/model/contactModel.js";
import { SERVICES, CONTACT } from "./nebcoSeed.js";

const all = Object.fromEntries(MODULES.map((module) => [module, ACTIONS]));

// Which actions each role gets. Everything not listed stays off.
const ROLE_LIST = [
  {
    slug: ROLES.SUPER_ADMIN,
    name: "Super Admin",
    description: "Full access to everything",
    isSystem: true,
    permissions: perm(all),
  },
  {
    slug: ROLES.ADMIN,
    name: "Administrator",
    description: "Manages users, content and inbox",
    isSystem: false,
    permissions: perm({
      dashboard: ACTIONS,
      projects: ACTIONS,
      services: ["read", "update"],
      pages: ["read", "update"],
      enquiries: ACTIONS,
      appointments: ACTIONS,
      testimonials: ACTIONS,
      team: ACTIONS,
      media: ACTIONS,
      users: ["read", "create", "update"],
      roles: ["read"],
      permissions: ["read"],
      audit: ["read"],
      settings: ACTIONS,
    }),
  },
  {
    slug: ROLES.EDITOR,
    name: "Content Editor",
    description: "Edits pages, projects and media",
    isSystem: false,
    permissions: perm({
      dashboard: ["read"],
      projects: ["read", "create", "update"],
      services: ["read"],
      pages: ["read", "update"],
      testimonials: ["read", "create", "update"],
      team: ["read", "create", "update"],
      media: ["read", "create", "delete"],
    }),
  },
  {
    slug: ROLES.SALES,
    name: "Sales",
    description: "Handles enquiries and appointments",
    isSystem: false,
    permissions: perm({
      dashboard: ["read"],
      enquiries: ["read", "update"],
      appointments: ["read", "update"],
      projects: ["read"],
      services: ["read"],
    }),
  },
  {
    slug: ROLES.VIEWER,
    name: "Viewer",
    description: "Read only access to the dashboard",
    isSystem: false,
    permissions: perm({ dashboard: ["read"] }),
  },
];

const seed = async () => {
  await connectDB();

  for (const item of ROLE_LIST) {
    const role = await Role.findOneAndUpdate(
      { slug: item.slug },
      {
        name: item.name,
        description: item.description,
        isSystem: item.isSystem,
      },
      { upsert: true, new: true },
    );

    await Permission.findOneAndUpdate(
      { role: role._id },
      { modules: item.permissions },
      { upsert: true, new: true }, //(upsert) if exists update it and if not create it
    );
  }
  logger.info(`Roles and permissions seeded: ${ROLE_LIST.length}`);

  let user = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!user) {
    const superAdmin = await Role.findOne({ slug: ROLES.SUPER_ADMIN });
    user = new User({
      name: process.env.ADMIN_NAME,
      email: process.env.ADMIN_EMAIL,
      role: superAdmin._id,
    });
  }
  user.password = process.env.ADMIN_PASSWORD;
  await user.save();

  logger.info(`Seed done: ${user.email} (super-admin)`);

  for (const item of SERVICES) {
    await Service.findOneAndUpdate({ slug: item.slug }, item, {
      upsert: true,
      new: true,
    });
  }
  logger.info(`Services seeded: ${SERVICES.length}`);

  await Contact.findOneAndUpdate({}, CONTACT, { upsert: true, new: true });
  logger.info("Contact seeded");

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
