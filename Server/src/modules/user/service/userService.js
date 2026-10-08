import {
  findAll,
  countAll,
  findById,
  findByEmail,
  createUser,
  saveUser,
  removeUser,
  countActiveSuperAdmins,
} from "../repository/userRepository.js";
import { clearAccessCache } from "../../../utils/rbacCache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicUser = (user) => {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    role: user.role,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
  };
};

export const list = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

  const filter = {};
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } },
    ];
  }
  if (query.isActive === "true") filter.isActive = true;
  if (query.isActive === "false") filter.isActive = false;

  const [items, total] = await Promise.all([
    findAll(filter, (page - 1) * limit, limit),
    countAll(filter),
  ]);

  return { items: items.map(publicUser), total, page, limit };
};

export const create = async (data) => {
  if (await findByEmail(data.email)) {
    throw new ApiError(409, "An account with this email already exists");
  }

  const user = await createUser(data);

  return publicUser(user);
};

export const update = async (id, data) => {
  const user = await findById(id);
  if (!user) throw new ApiError(404, "User not found");

  // The last super admin must stay active.
  const losingAdmin =
    user.role?.slug === "super-admin" && (data.isActive === false || data.role);
  if (losingAdmin && (await countActiveSuperAdmins(id)) === 0) {
    throw new ApiError(400, "At least one active super admin must remain");
  }

  if (data.name !== undefined) user.name = data.name;
  if (data.email !== undefined) user.email = data.email;
  if (data.role !== undefined) user.role = data.role;
  if (data.isActive !== undefined) user.isActive = data.isActive;
  if (data.password) user.password = data.password;

  const saved = await saveUser(user);
  await clearAccessCache(id);

  return publicUser(saved);
};

export const remove = async (id, currentUserId) => {
  if (String(id) === String(currentUserId)) {
    throw new ApiError(400, "You cannot delete your own account");
  }

  const user = await findById(id);
  if (!user) throw new ApiError(404, "User not found");

  if (user.role?.slug === "super-admin" && (await countActiveSuperAdmins(id)) === 0) {
    throw new ApiError(400, "At least one active super admin must remain");
  }

  await removeUser(id);
  await clearAccessCache(id);
};
