import {
  findById,
  findAll,
  countAll,
  createMedia,
  removeMedia,
} from "../repository/mediaRepository.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../../../middleware/uploadMiddleware.js";
import { ApiError } from "../../../utils/ApiError.js";

export const list = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);

  const [items, total] = await Promise.all([
    findAll((page - 1) * limit, limit),
    countAll(),
  ]);

  return { items, total, page, limit };
};

export const upload = async (file) => {
  if (!file) throw new ApiError(400, "No file uploaded");

  const result = await uploadToCloudinary(file.buffer);

  const media = await createMedia({
    publicId: result.public_id,
    url: result.secure_url,
    fileName: file.originalname,
    size: file.size,
    mimeType: file.mimetype,
  });

  return media;
};

export const remove = async (id) => {
  const media = await findById(id);
  if (!media) throw new ApiError(404, "File not found");

  await deleteFromCloudinary(media.publicId);
  await removeMedia(id);
};