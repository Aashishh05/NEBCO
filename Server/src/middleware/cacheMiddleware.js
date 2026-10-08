import { getCache, setCache } from "../utils/cache.js";

// Wraps a public GET. First call hits MongoDB and stores the response in
// Redis; later calls read Redis and set `X-Cache: HIT`.
export const cache = (name) => async (req, res, next) => {
  const key = `${name}:${req.originalUrl}`;

  const cached = await getCache(key);
  if (cached !== undefined) {
    res.set("X-Cache", "HIT");
    return res.json(cached);
  }

  res.set("X-Cache", "MISS");

  const send = res.json.bind(res);
  res.json = (body) => {
    if (body && body.success) setCache(key, body);
    return send(body);
  };

  next();
};