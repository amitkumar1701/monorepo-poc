/* eslint-disable max-lines */
const validator = require("validator");
const _ = require("lodash");
const Boom = require("boom");
const Promise = require("bluebird");
const config = require("config");
const { checkPasswordLength, checkPasswordComplexity, checkPasswordPartOfUsername } = require("@sofdesk/core");

const debug = require("debug")("controllers:roofgraf:users:v1");
const User = require("../../models/user");

const appConfig = config.get("roofgraf");

const signup = (req, res, next) => {
  const payload = req.swagger.params.payload.value;
  const {
    email,
    password,
    clientId
  } = payload;
  const userAgent = req.headers["user-agent"];
  const { host } = req.headers;

  debug(
    "Sign Up with %s and %s from client with id: %s",
    email,
    clientId
  );

  return Promise.resolve()
    .then(() => {
      if (_.includes(appConfig.jwt.clientIds, clientId))
        return validator.isEmail(email);

      throw Boom.unauthorized("Access denied: Authentication required");
    })
    .then(isEmailValid => {
      if (isEmailValid) {
        return Promise.all([
          checkPasswordLength(password),
          checkPasswordComplexity(password),
          checkPasswordPartOfUsername(email, password)
        ]);
      }
      throw Boom.badRequest(
        "The Email field must contain a valid email address.",
        [{ code: "email_invalid_format" }]
      );
    })
    .tap(user => {
      User.setPersistHash({ userId: user.get("id"), userAgent, clientId });
    })
    .then(() => {
      if (_.includes(appConfig.jwt.clientIds, clientId)) {
        return User.login({
          email,
          password,
          host
        });
      }

      throw Boom.unauthorized("Access denied: Authentication required");
    })
    .then(loginResponse => res.json(loginResponse))
    .catch(next);
};

module.exports = {
  signup,
};
