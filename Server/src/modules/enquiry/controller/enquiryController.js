import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as enquiryService from "../service/enquiryService.js";
import { record } from "../../audit/service/auditService.js";

export const submitEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.submit(req.body, req.ip);

  sendSuccess(res, { enquiry }, "Enquiry received");
});

export const getEnquiries = asyncHandler(async (req, res) => {
  const { items, total, page, limit } = await enquiryService.list(req.query);

  sendSuccess(res, { items, total, page, limit });
});

export const updateEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await enquiryService.update(req.params.id, {
    ...req.body,
    actorId: req.user.id,
  });

  await record(req, "enquiry.update", "enquiry", req.params.id);

  sendSuccess(res, { enquiry }, "Enquiry updated");
});

export const deleteEnquiry = asyncHandler(async (req, res) => {
  await enquiryService.remove(req.params.id);

  await record(req, "enquiry.delete", "enquiry", req.params.id);

  sendSuccess(res, null, "Enquiry deleted");
});

export const exportEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await enquiryService.listForExport();

  const escape = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
  let csv = ["ID", "Name", "Email", "Phone", "Interest", "Status", "Assignee", "Date"]
    .map(escape)
    .join(",") + "\n";

  for (const enquiry of enquiries) {
    csv += [enquiry._id, enquiry.name, enquiry.email, enquiry.phone, enquiry.interest, enquiry.status, enquiry.assignee?.name || "", enquiry.createdAt.toISOString()]
      .map(escape)
      .join(",") + "\n";
  }

  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="enquiries.csv"');
  res.send(csv);
});