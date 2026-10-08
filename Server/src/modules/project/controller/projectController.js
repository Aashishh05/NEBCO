import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as projectService from "../service/projectService.js";
import { record } from "../../audit/service/auditService.js";

export const getProjects = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await projectService.list(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const project = await projectService.getBySlug(req.params.slug);

  sendSuccess(res, { project });
});

export const getFeaturedProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.featured(req.query.limit);

  sendSuccess(res, { projects });
});

export const getAdminProjects = asyncHandler(async (req, res) => {
  const projects = await projectService.listAdmin();

  sendSuccess(res, { projects });
});

export const createProject = asyncHandler(async (req, res) => {
  const project = await projectService.create(req.body);

  await record(req, "project.create", "project", project.id);

  sendSuccess(res, { project }, "Project created", 201);
});

export const updateProject = asyncHandler(async (req, res) => {
  const project = await projectService.update(req.params.id, req.body);

  await record(req, "project.update", "project", project.id);

  sendSuccess(res, { project }, "Project updated");
});

export const deleteProject = asyncHandler(async (req, res) => {
  await projectService.remove(req.params.id);

  await record(req, "project.delete", "project", req.params.id);

  sendSuccess(res, null, "Project deleted");
});