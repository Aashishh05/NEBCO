import Enquiry from "../model/enquiryModel.js";
import {
  createEnquiry,
  findAll,
  countAll,
  findById,
  saveEnquiry,
  removeEnquiry,
} from "../repository/enquiryRepository.js";
import {
  sendEmail,
  confirmationEmail,
  notificationEmail,
} from "../../../utils/sendEmail.js";
import { ApiError } from "../../../utils/ApiError.js";

export const isBot = (data) => Boolean(data.website);

export const submit = async (data, ip) => {
  if (isBot(data)) return null;

  const { website, ...form } = data;
  const enquiry = await createEnquiry({ ...form, ip });

  await sendEmail({
    to: enquiry.email,
    ...confirmationEmail(enquiry.name, "enquiry"),
  });
  if (process.env.NOTIFY_EMAIL) {
    await sendEmail({
      to: process.env.NOTIFY_EMAIL,
      ...notificationEmail(enquiry, "enquiry"),
    });
  }

  return enquiry;
};

export const list = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.search)
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } },
    ];

  const [items, total] = await Promise.all([
    findAll(filter, (page - 1) * limit, limit),
    countAll(filter),
  ]);

  return { items, total, page, limit };
};

export const update = async (id, data) => {
  const enquiry = await findById(id);
  if (!enquiry) throw new ApiError(404, "Enquiry not found");

  if (data.status !== undefined) enquiry.status = data.status;
  if (data.assignee !== undefined) enquiry.assignee = data.assignee || null;
  if (data.note && data.note.trim()) {
    enquiry.notes.push({ author: data.actorId, text: data.note.trim() });
  }

  return await saveEnquiry(enquiry);
};

export const remove = async (id) => {
  const enquiry = await findById(id);
  if (!enquiry) throw new ApiError(404, "Enquiry not found");

  await removeEnquiry(id);
};

export const listForExport = async () => {
  return await Enquiry.find()
    .populate("assignee", "name")
    .sort({ createdAt: -1 });
};
