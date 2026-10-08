import {
  findByRole,
  findAll,
  createForRole,
  savePermission,
  removeByRole,
} from "../repository/permissionRepository.js";
import { findIdsByRole } from "../../user/repository/userRepository.js";
import { clearAccessCache } from "../../../utils/rbacCache.js";
import { emptyPermissions, ACTIONS } from "../../../constants/permissionsConstant.js";
import { ApiError } from "../../../utils/ApiError.js";


export const toMatrix = (permission) => {
  if (!permission) return emptyPermissions();

  const matrix = {};

  for (const [module, actions] of permission.modules) {
    matrix[module] = Object.fromEntries(ACTIONS.map((action) => [action, actions[action]]));
  }

  return matrix;
};

export const getPermissionsForRole = async (roleId) => {
  return toMatrix(await findByRole(roleId));
};

export const list = async () => {
  return await findAll();
};

export const getByRole = async (roleId) => {
  const permission = await findByRole(roleId);
  if (!permission) throw new ApiError(404, "No permissions found for this role");

  return permission;
};

export const update = async (roleId, modules) => {
  const permission = (await findByRole(roleId)) || (await createForRole(roleId));

  for (const [module, actions] of Object.entries(modules)) {
    permission.modules.set(module, {
      read: actions.read,
      create: actions.create,
      update: actions.update,
      delete: actions.delete,
    });
  }

  const saved = await savePermission(permission);

  const userIds = await findIdsByRole(roleId);
  await Promise.all(userIds.map((id) => clearAccessCache(id)));

  return saved;
};

export const remove = async (roleId) => {
  await removeByRole(roleId);
};
