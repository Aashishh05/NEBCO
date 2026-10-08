import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as permissionService from "../service/permissionService.js";
import { record } from "../../audit/service/auditService.js";

export const getPermissions = asyncHandler(async (req, res) => {
  const permissions = await permissionService.list();

  sendSuccess(res, { permissions });
});

export const getPermissionsByRole = asyncHandler(async (req, res) => {
  const permission = await permissionService.getByRole(req.params.roleId);

  sendSuccess(res, { permission });
});

export const updatePermissions = asyncHandler(async (req, res) => {
  const permission = await permissionService.update(
    req.params.roleId,
    req.body.modules,
  );

  await record(req, "permission.update", "role", req.params.roleId);

  sendSuccess(res, { permission }, "Permissions updated");
});
