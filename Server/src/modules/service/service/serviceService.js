import {
  findAll,
  findActive,
  findActiveBySlug,
  findById,
  findBySlug,
  createService,
  saveService,
  removeService,
} from "../repository/serviceRepository.js";
import { clearCache } from "../../../utils/cache.js";
import { ApiError } from "../../../utils/ApiError.js";

const publicService = (service) => {
  return {
    id: service._id,
    navLabel: service.navLabel,
    name: service.name,
    slug: service.slug,
    tagline: service.tagline,
    intro: service.intro,
    image: service.image,
    accentColor: service.accentColor,
    chips: service.chips,
    scopeBullets: service.scopeBullets,
    cta: service.cta,
    cards: service.cards,
  };
};

// Runs after every admin write so public pages refresh immediately.
const invalidate = () => clearCache("services");

export const listActive = async () => {
  const services = await findActive();

  return services.map(publicService);
};

export const getBySlug = async (slug) => {
  const service = await findActiveBySlug(slug);
  if (!service) throw new ApiError(404, "Service not found");

  return publicService(service);
};

export const listAdmin = async () => {
  const services = await findAll();

  return services.map((service) => ({ ...publicService(service), order: service.order, isActive: service.isActive }));
};

export const create = async (data) => {
  if (await findBySlug(data.slug)) {
    throw new ApiError(409, "A service with this slug already exists");
  }

  const service = await createService(data);
  await invalidate();

  return publicService(service);
};

export const update = async (id, data) => {
  const service = await findById(id);
  if (!service) throw new ApiError(404, "Service not found");

  for (const [field, value] of Object.entries(data)) {
    if (field !== "id") service[field] = value;
  }

  const saved = await saveService(service);
  await invalidate();

  return publicService(saved);
};

export const remove = async (id) => {
  const service = await findById(id);
  if (!service) throw new ApiError(404, "Service not found");

  await removeService(id);
  await invalidate();
};