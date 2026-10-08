import { authService } from "../service/authService.js";
import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import { generateToken, cookieOptions } from "../../../utils/generateToken.js";

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.login(email, password);
  const token = generateToken(user.id);

  res.cookie("token", token, cookieOptions());

  sendSuccess(
    res,
    {
      user,
      permissions: user.permissions,
    },
    "Logged in",
  );
});

export const logout = asyncHandler(async (req, res) => {
  res.clearCookie("token", cookieOptions());

  sendSuccess(res, null, "Logged out");
});

export const me = asyncHandler(async (req, res) => {
  sendSuccess(res, {
    user: req.user,
    permissions: req.user.permissions,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  await authService.changePassword(req.user.id, currentPassword, newPassword);

  sendSuccess(res, null, "Password updated");
});
