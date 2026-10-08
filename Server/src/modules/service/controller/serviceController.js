import { asyncHandler } from "../../../utils/asyncHandler.js";
import { sendSuccess } from "../../../utils/response.js";
import * as serviceService from "../service/serviceService.js";
import { record } from "../../audit/service/auditService.js";

export const getServices = asyncHandler(async (req, res) => {
  const services = await serviceService.listActive();

  sendSuccess(res, { services });
});

export const getServiceBySlug = asyncHandler(async (req, res) => {
  const service = await serviceService.getBySlug(req.params.slug);

  sendSuccess(res, { service });
});

export const getAdminServices = asyncHandler(async (req, res) => {
  const services = await serviceService.listAdmin();

  sendSuccess(res, { services });
});

export const createService = asyncHandler(async (req, res) => {
  const service = await serviceService.create(req.body);

  await record(req, "service.create", "service", service.id);

  sendSuccess(res, { service }, "Service created", 201);
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await serviceService.update(req.params.id, req.body);

  await record(req, "service.update", "service", service.id);

  sendSuccess(res, { service }, "Service updated");
});

export const deleteService = asyncHandler(async (req, res) => {
  await serviceService.remove(req.params.id);

  await record(req, "service.delete", "service", req.params.id);

  sendSuccess(res, null, "Service deleted");
});