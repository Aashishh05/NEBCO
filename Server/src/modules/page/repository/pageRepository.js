import Page from "../model/pageModel.js";

export const findAll = async () => {
  return await Page.find().sort({ createdAt: 1 });
};

export const findByKey = async (key) => {
  return await Page.findOne({ key });
};

export const upsertByKey = async (key, data) => {
  return await Page.findOneAndUpdate({ key }, data, { upsert: true, new: true });
};