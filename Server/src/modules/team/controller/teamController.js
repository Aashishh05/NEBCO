import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as teamService from "../service/teamService.js";
import { record } from "../../audit/service/auditService.js";

export const getTeam = asyncHandler(async (req, res) => {
  const team = await teamService.list();

  sendSuccess(res, { team });
});

export const getAdminTeam = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await teamService.listAdmin(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const createMember = asyncHandler(async (req, res) => {
  const member = await teamService.create(req.body);

  await record(req, "team.create", "team", member.id);

  sendSuccess(res, { member }, "Team member created", 201);
});

export const updateMember = asyncHandler(async (req, res) => {
  const member = await teamService.update(req.params.id, req.body);

  await record(req, "team.update", "team", member.id);

  sendSuccess(res, { member }, "Team member updated");
});

export const deleteMember = asyncHandler(async (req, res) => {
  await teamService.remove(req.params.id);

  await record(req, "team.delete", "team", req.params.id);

  sendSuccess(res, null, "Team member deleted");
});