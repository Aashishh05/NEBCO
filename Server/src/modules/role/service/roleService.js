import {
  findPage,
  count,
  findById,
  findBySlug,
  createRole,
  saveRole,
  removeRole,
} from "../repository/roleRepository.js";
import { findIdsByRole } from "../../user/repository/userRepository.js";
import {
  createForRole,
  removeByRole,
} from "../../permission/repository/permissionRepository.js";
import { clearAccessCache } from "../../../utils/rbacCache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicRole = (role) => {
  return {
    id: role._id,
    name: role.name,
    slug: role.slug,
    description: role.description,
    isSystem: role.isSystem,
    createdAt: role.createdAt,
  };
};

// Removing a role means every user holding it loses access, so their cache goes too.
const clearRoleCache = async (roleId) => {
  const userIds = await findIdsByRole(roleId);
  await Promise.all(userIds.map((id) => clearAccessCache(id)));
};

export const list = async (query = {}) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);

  const filter = {};
  if (query.search)
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { slug: { $regex: query.search, $options: "i" } },
    ];

  const [roles, total] = await Promise.all([
    findPage(filter, (page - 1) * limit, limit),
    count(filter),
  ]);

  return { items: roles.map(publicRole), total, page, limit };
};

export const create = async (data) => {
  if (await findBySlug(data.slug)) {
    throw new ApiError(409, "A role with this slug already exists");
  }

  const role = await createRole(data);

  // New roles start with every permission off, edited later in the Permissions screen.
  await createForRole(role._id);

  return publicRole(role);
};

export const update = async (id, data) => {
  const role = await findById(id);
  if (!role) throw new ApiError(404, "Role not found");

  if (data.name !== undefined) role.name = data.name;
  if (data.description !== undefined) role.description = data.description;

  const saved = await saveRole(role);
  await clearRoleCache(id);

  return publicRole(saved);
};

export const remove = async (id) => {
  const role = await findById(id);
  if (!role) throw new ApiError(404, "Role not found");

  if (role.isSystem) {
    throw new ApiError(400, "System roles cannot be deleted");
  }

  const users = await findIdsByRole(id);
  if (users.length > 0) {
    throw new ApiError(400, "Role is still used by users");
  }

  await removeRole(id);
  await removeByRole(id);
};
