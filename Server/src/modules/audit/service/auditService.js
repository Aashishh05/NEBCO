import { createEntry, findAll, countAll } from "../repository/auditRepository.js";

// Records one action. Never throws: logging must not break the request.
// actor is passed on login, where req.user does not exist yet.
export const record = async (
  req,
  action,
  resource = "",
  resourceId = "",
  actor = req.user,
) => {
  try {
    await createEntry({
      user: actor?.id,
      userEmail: actor?.email || "",
      action,
      resource,
      resourceId: String(resourceId),
      ip: req.ip,
    });
  } catch {
    // ignore
  }
};

export const list = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

  const filter = {};
  if (query.action) filter.action = query.action;
  if (query.resource) filter.resource = query.resource;
  if (query.userEmail) filter.userEmail = query.userEmail;

  const [items, total] = await Promise.all([
    findAll(filter, (page - 1) * limit, limit),
    countAll(filter),
  ]);

  return { items, total, page, limit };
};
