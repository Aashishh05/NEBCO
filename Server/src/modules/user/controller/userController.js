import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as userService from "../service/userService.js";
import { record } from "../../audit/service/auditService.js";

export const getUsers = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await userService.list(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const createUser = asyncHandler(async (req, res) => {
  const user = await userService.create(req.body);

  await record(req, "user.create", "user", user.id);

  sendSuccess(res, { user }, "User created", 201);
});

export const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.update(req.params.id, req.body);

  await record(req, "user.update", "user", user.id);

  sendSuccess(res, { user }, "User updated");
});

export const deleteUser = asyncHandler(async (req, res) => {
  await userService.remove(req.params.id, req.user.id);

  await record(req, "user.delete", "user", req.params.id);

  sendSuccess(res, null, "User deleted");
});
