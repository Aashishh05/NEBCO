import {
  findActive,
  findAll,
  findById,
  createMember,
  saveMember,
  removeMember,
} from "../repository/teamRepository.js";
import { clearCache } from "../../../utils/cache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicMember = (member) => {
  return {
    id: member._id,
    name: member.name,
    position: member.position,
    bio: member.bio,
    photo: member.photo,
    socials: member.socials,
  };
};

const invalidate = () => clearCache("team");

export const list = async () => {
  const members = await findActive();

  return members.map(publicMember);
};

export const listAdmin = async () => {
  const members = await findAll();

  return members.map((member) => ({ ...publicMember(member), order: member.order, isActive: member.isActive }));
};

export const create = async (data) => {
  const member = await createMember(data);
  await invalidate();

  return publicMember(member);
};

export const update = async (id, data) => {
  const member = await findById(id);
  if (!member) throw new ApiError(404, "Team member not found");

  for (const [field, value] of Object.entries(data)) {
    if (field !== "id") member[field] = value;
  }

  const saved = await saveMember(member);
  await invalidate();

  return publicMember(saved);
};

export const remove = async (id) => {
  const member = await findById(id);
  if (!member) throw new ApiError(404, "Team member not found");

  await removeMember(id);
  await invalidate();
};