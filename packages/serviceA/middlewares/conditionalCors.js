const cors = require("cors");
const _ = require("lodash");
const config = require("config");

const corsConfig = config.get("cors");

const corsMiddleware = cors(corsConfig);

const conditionalCors = (req, res, next) => {
  if (res.get("Access-Control-Allow-Origin")) return next();
  return corsMiddleware(req, res, next);
};

module.exports = conditionalCors;
