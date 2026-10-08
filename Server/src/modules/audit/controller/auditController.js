import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import { list } from "../service/auditService.js";

export const getAuditLogs = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await list(req.query);

  sendSuccess(res, { items, total, page, limit });
});
