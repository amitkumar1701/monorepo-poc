/* eslint-disable max-lines */
const Boom = require("boom");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const sanitizer = require("sanitizer");
const db = require("../helpers/bookshelf");
const { getPersistHash } = require("../helpers/roofgraf");

const appConfig = config.get("roofgraf");
const debug = require("debug")("models:user_model");
const utils = require("../helpers/utils");

const User = db.Model.extend(
  {
    tableName: "user",
    initialize() {
      this.on("creating", this.checkEmailExist);
    },

    checkEmailExist() {
      return User.query("where", "email", this.get("email"))
        .query("where", "password", "!=", "")
        .query("whereNotNull", "password")
        .fetch()
        .then(existing => {
          /* istanbul ignore else  */
          if (existing) {
            throw Boom.badRequest("The email address is already registered", [
              { code: "the_email_address_is_already_registered" }
            ]);
          }
        });
    }
  },
  {
    setPersistHash: (userId, userAgent, clientId) => {
      const hash = getPersistHash(clientId, pbConfig.key, userId, userAgent);
      return User.updateUserWithId(userId, { persist_hash: hash });
    },

    generateAuthenticatedUser: (userModel, host, params = {}) => {
      const user = {
        id: userModel.get("id"),
        email: userModel.get("email"),
        createdAt: userModel.get("created_at"),
      };
      const token = jwt.sign(
        {
          iss: host,
          iat: Math.floor(Date.now() / 1000),
          user,
          refreshToken: userModel.get("persist_hash")
        },
        appConfig.jwt.key,
        { algorithm: appConfig.jwt.alg, expiresIn: appConfig.jwt.exp }
      );

      return {
        user,
        accessToken: token,
        refreshToken: userModel.get("persist_hash")
      };
    },

    createUser: ({ email, password }) => {
      const sanitizedEmail = sanitizer.sanitize(email);
      debug("create new user for with email %s", email);
      const now = utils.getNow();
      return bcrypt.hash(sanitizer.sanitize(password), appConfig.saltRounds)
      .then((passwordHash) => {
        const params = {
          email: sanitizedEmail,
          password: passwordHash,
          created_at: now,
          updated_at: now,
          disable: 0
        };
        return new User(params).save()
      })
      .then(() => User.generateAuthenticatedUser(userModel, host))
        .catch(error => {
          const userModelNotFound = error instanceof User.NotFoundError;
          if (userModelNotFound) {
            throw Boom.unauthorized("Invalid username/password combination");
          }
          throw error;
        });
    },
  }
);

module.exports = db.model("User", User);
