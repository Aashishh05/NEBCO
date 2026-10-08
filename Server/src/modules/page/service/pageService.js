import { findAll, findByKey, upsertByKey } from "../repository/pageRepository.js";
import { clearCache } from "../../../utils/cache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicPage = (page) => {
  return {
    key: page.key,
    label: page.label,
    data: page.data,
  };
};

export const list = async () => {
  const pages = await findAll();

  return pages.map(publicPage);
};

export const getByKey = async (key) => {
  const page = await findByKey(key);
  if (!page) throw new ApiError(404, "Page block not found");

  return publicPage(page);
};

export const update = async (key, data) => {
  const page = await upsertByKey(key, { label: data.label, data: data.data });

  // The home page reads these blocks, refresh it now.
  await clearCache("pages");

  return publicPage(page);
};