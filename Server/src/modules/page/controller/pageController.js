import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as pageService from "../service/pageService.js";
import { record } from "../../audit/service/auditService.js";

export const getPages = asyncHandler(async (req, res) => {
  const pages = await pageService.list();

  sendSuccess(res, { pages });
});

export const getPage = asyncHandler(async (req, res) => {
  const page = await pageService.getByKey(req.params.key);

  sendSuccess(res, { page });
});

export const updatePage = asyncHandler(async (req, res) => {
  const page = await pageService.update(req.params.key, req.body);

  await record(req, "page.update", "page", page.key);

  sendSuccess(res, { page }, "Page block updated");
});