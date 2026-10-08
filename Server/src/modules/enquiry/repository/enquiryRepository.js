import Enquiry from "../model/enquiryModel.js";

export const createEnquiry = async (data) => {
  return await Enquiry.create(data);
};

export const findAll = async (filter, skip, limit) => {
  return await Enquiry.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("assignee", "name email")
    .populate("notes.author", "name");
};

export const countAll = async (filter) => {
  return await Enquiry.countDocuments(filter);
};

export const findById = async (id) => {
  return await Enquiry.findById(id)
    .populate("assignee", "name email")
    .populate("notes.author", "name");
};

export const saveEnquiry = async (enquiry) => {
  return await enquiry.save();
};

export const removeEnquiry = async (id) => {
  return await Enquiry.findByIdAndDelete(id);
};