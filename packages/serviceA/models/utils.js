exports.cleanUpDate = date =>
  date
    .toISOString()
    .replace(/T/, " ")
    .replace(/\..+/, "");

exports.getNow = () => exports.cleanUpDate(new Date());

exports.getDateAfterYears = yearsAfter => {
  const now = new Date();
  now.setFullYear(now.getFullYear() + yearsAfter);
  return exports.cleanUpDate(now);
};

exports.generateErrorCodeFromString = codeString =>
  codeString
    .toLowerCase()
    .split(" ")
    .join("_");

exports.isUUID = uuid =>
  uuid.match(
    new RegExp(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
    )
  );

exports.isSlug = slug => slug.match(/((?:[a-z]+-?)+)(.*)/);
