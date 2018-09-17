const Boom = require("boom");
const _ = require("lodash");
const Promise = require("bluebird");
const bcrypt = require("bcrypt");
const sanitizer = require("sanitizer");
const sha1 = require("sha1");

const checkPasswordPartOfUsername = (email, password) =>
  !_.includes(email, password)
    ? Promise.resolve(true)
    : Promise.reject(
        Boom.badRequest(
          "Your password cannot be a part of your email address.",
          [{ code: "your_passord_cannot_be_a_part_of_your_email_address" }]
        )
      );

const checkPasswordLength = password =>
  password.length > 7
    ? Promise.resolve(true)
    : Promise.reject(
        Boom.badRequest("Password too short", [{ code: "password_too_short" }])
      );

const checkPasswordPreviouslyUsed = async (id, password, currentPassword) => {
  const sanitizedPassword = sanitizer.sanitize(password);
  const result = await bcrypt.compare(
    sanitizedPassword,
    currentPassword.replace("$2y$", "$2a$")
  );
  return !result
    ? Promise.resolve(true)
    : Promise.reject(
        Boom.badRequest(
          "You cannot reuse a previous password. Please create a new password."
        )
      );
};

const checkPasswordComplexity = password => {
  const passwordRegex = new RegExp(
    "^(?=.*[A-Za-z])(?=.*\\d)[\\da-zA-Z\"'()+,-./:;<=>@[\\]^_`{|}~!$%@#£€*?&]{7,}$"
  );
  return passwordRegex.test(password)
    ? Promise.resolve(true)
    : Promise.reject(
        Boom.badRequest(
          "This password is not complex enough. " +
            "Please include at least 1 letter (a, b, c..., A, B, C...) and 1 number (0, 1, 2, ...).",
          [{ code: "password_not_complex_enough" }]
        )
      );
};

const passwordValidation = ({ id, email, password, currentPassword }) =>
  Promise.all([
    checkPasswordLength(password),
    checkPasswordComplexity(password),
    checkPasswordPartOfUsername(email, password),
    checkPasswordPreviouslyUsed(id, password, currentPassword)
  ]);

const getPersistHash = ({ clientId, key, userId, userAgent }) => {
  const now = new Date().toISOString();
  return sha1(`${clientId}${key}${userId}${userAgent}${now}`);
};

module.exports = {
  checkPasswordComplexity,
  checkPasswordPreviouslyUsed,
  checkPasswordPartOfUsername,
  checkPasswordLength,
  passwordValidation,
  getPersistHash
};
