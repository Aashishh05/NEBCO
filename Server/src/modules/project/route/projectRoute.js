import { Router } from "express";
import {
  getProjects,
  getProjectBySlug,
  getFeaturedProjects,
  getAdminProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../controller/projectController.js";
import { cache } from "../../../middleware/cacheMiddleware.js";
import { authMiddleware } from "../../../middleware/authMiddleware.js";
import { checkPermission } from "../../../middleware/permissionMiddleware.js";
import { validate } from "../../../middleware/validateMiddleware.js";
import { createProjectSchema, updateProjectSchema } from "../validation/projectValidation.js";

const router = Router();

router.get(
  "/admin/all",
  authMiddleware,
  checkPermission("projects", "read"),
  getAdminProjects,
);

router.get("/featured", cache("projects"), getFeaturedProjects);
router.get("/", cache("projects"), getProjects);
router.get("/:slug", cache("projects"), getProjectBySlug);

router.use(authMiddleware);

router.post("/", checkPermission("projects", "create"), validate(createProjectSchema), createProject);
router.put("/:id", checkPermission("projects", "update"), validate(updateProjectSchema), updateProject);
router.delete("/:id", checkPermission("projects", "delete"), deleteProject);

export default router;