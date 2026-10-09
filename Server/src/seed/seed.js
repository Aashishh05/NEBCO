import "dotenv/config";
import mongoose from "mongoose";
import Role from "../modules/role/model/roleModel.js";
import Permission from "../modules/permission/model/permissionModel.js";
import User from "../modules/auth/model/userModel.js";
import { logger } from "../utils/logger.js";
import { connectDB } from "../config/db.js";
import { clearCache } from "../utils/cache.js";
import { clearAccessCache } from "../utils/rbacCache.js";
import ROLES from "../constants/rolesConstant.js";
import MODULES from "../constants/modulesConstant.js";
import { ACTIONS, perm } from "../constants/permissionsConstant.js";
import Contact from "../modules/contact/model/contactModel.js";
import Project from "../modules/project/model/projectModel.js";
import TeamMember from "../modules/team/model/teamModel.js";
import Testimonial from "../modules/testimonial/model/testimonialModel.js";
import { CONTACT, PROJECTS, TEAM, TESTIMONIALS } from "./nebcoSeed.js";

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

  const superAdminRole = await Role.findOne({ slug: ROLES.SUPER_ADMIN });

  // Reuse the existing Super Admin (match by role first, then by email) so
  // changing ADMIN_EMAIL / ADMIN_PASSWORD in .env updates that account
  // instead of creating a second one.
  let user = await User.findOne({ role: superAdminRole._id });
  if (!user) user = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!user) user = new User({ role: superAdminRole._id });

  user.name = process.env.ADMIN_NAME || user.name;
  user.email = process.env.ADMIN_EMAIL || user.email;
  user.role = superAdminRole._id;
  user.password = process.env.ADMIN_PASSWORD;
  await user.save();
  await clearAccessCache(user._id);

  logger.info(`Seed done: ${user.email} (super-admin)`);

  await Contact.findOneAndUpdate({}, CONTACT, { upsert: true, new: true });
  logger.info("Contact seeded");

  for (const item of PROJECTS) {
    await Project.findOneAndUpdate({ slug: item.slug }, item, {
      upsert: true,
      new: true,
    });
  }
  logger.info(`Projects seeded: ${PROJECTS.length}`);

  for (const item of TEAM) {
    await TeamMember.findOneAndUpdate({ name: item.name }, item, {
      upsert: true,
      new: true,
    });
  }
  logger.info(`Team seeded: ${TEAM.length}`);

  for (const item of TESTIMONIALS) {
    await Testimonial.findOneAndUpdate({ client: item.client }, item, {
      upsert: true,
      new: true,
    });
  }
  logger.info(`Testimonials seeded: ${TESTIMONIALS.length}`);

  // Dropped data may still be cached in Redis, refresh everything.
  for (const name of ["contact", "projects", "team", "testimonials"]) {
    await clearCache(name);
  }
  logger.info("Cache cleared");

  await mongoose.disconnect();
  process.exit(0);
};

seed().catch((err) => {
  logger.error(err);
  process.exit(1);
});
