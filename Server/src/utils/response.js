export const sendSuccess = (
  res,
  data = null,
  message = "OK",
  status = 200,
  meta,
) => {
  const body = { success: true, message, data };
  if (meta) body.meta = meta;
  return res.status(status).json(body);
};

export const sendError = (
  res,
  message = "Something went wrong",
  status = 500,
  errors,
) =>
  res
    .status(status)
    .json({ success: false, message, ...(errors && { errors }) });
