import AuditLog from "../model/auditModel.js";

export const createEntry = async (entry) => {
  return await AuditLog.create(entry);
};

export const findAll = async (filter, skip, limit) => {
  return await AuditLog.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("user", "name email");
};

export const countAll = async (filter) => {
  return await AuditLog.countDocuments(filter);
};
