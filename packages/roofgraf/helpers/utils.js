const _ = require("lodash");

exports.cleanUpDate = date =>
  date
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

exports.getNow = () => exports.cleanUpDate(new Date());