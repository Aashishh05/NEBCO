import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as roleService from "../service/roleService.js";
import { record } from "../../audit/service/auditService.js";

export const getRoles = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await roleService.list(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const createRole = asyncHandler(async (req, res) => {
  const role = await roleService.create(req.body);

  await record(req, "role.create", "role", role.id);

  sendSuccess(res, { role }, "Role created", 201);
});

export const updateRole = asyncHandler(async (req, res) => {
  const role = await roleService.update(req.params.id, req.body);

  await record(req, "role.update", "role", role.id);

  sendSuccess(res, { role }, "Role updated");
});

export const deleteRole = asyncHandler(async (req, res) => {
  await roleService.remove(req.params.id);

  await record(req, "role.delete", "role", req.params.id);

  sendSuccess(res, null, "Role deleted");
});
