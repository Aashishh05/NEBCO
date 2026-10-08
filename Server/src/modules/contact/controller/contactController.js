import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as contactService from "../service/contactService.js";
import { record } from "../../audit/service/auditService.js";

export const getContact = asyncHandler(async (req, res) => {
  const contact = await contactService.get();

  sendSuccess(res, { contact });
});

export const updateContact = asyncHandler(async (req, res) => {
  const contact = await contactService.update(req.body);

  await record(req, "contact.update", "contact", contact._id);

  sendSuccess(res, { contact }, "Contact details updated");
});