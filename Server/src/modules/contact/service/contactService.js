import { findFirst, upsert } from "../repository/contactRepository.js";
import { clearCache } from "../../../utils/cache.js";

export const get = async () => {
  return await findFirst();
};

export const update = async (data) => {
  const contact = await upsert(data);

  // The footer and contact page read this, refresh them now.
  await clearCache("contact");

  return contact;
};