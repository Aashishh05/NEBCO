import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as mediaService from "../service/mediaService.js";
import { record } from "../../audit/service/auditService.js";

export const getMedia = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await mediaService.list(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const uploadMedia = asyncHandler(async (req, res) => {
  const media = await mediaService.upload(req.file);

  await record(req, "media.upload", "media", media._id);

  sendSuccess(res, { media }, "File uploaded", 201);
});

export const deleteMedia = asyncHandler(async (req, res) => {
  await mediaService.remove(req.params.id);

  await record(req, "media.delete", "media", req.params.id);

  sendSuccess(res, null, "File deleted");
});