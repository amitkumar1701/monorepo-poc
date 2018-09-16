const _ = require("lodash");
const path = require("path");
const pkg = require("./package.json");
const bunyan = require("bunyan");
const server = require("./server.js");

const logger = bunyan.createLogger({ name: "roofgraf" });

/**
 * Function for setting up environmental vars
 * @returns {void}
 */
// eslint-disable-next-line max-statements
const setUpEnvVars = () => {
  const possibleNodeEnvs = ["local", "dev", "production"];
  let msg;

  // if NODE_ENV was not provided, use 'dev'
  process.env.NODE_ENV = process.env.NODE_ENV || "dev";
  let nodeEnv = process.env.NODE_ENV;

  if (nodeEnv === "dev") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  // have to change NODE_ENV to 'production' if 'prod' is passed
  // cannot set in .rock.yml
  if (nodeEnv === "prod") {
    process.env.NODE_ENV = "production";
    nodeEnv = "production";
  }

  // if there was a NODE_ENV provided but it is not one of the allowed options
  if (!_.includes(possibleNodeEnvs, nodeEnv)) {
    msg = `Your NODE_ENV is set to ${nodeEnv} which is invalid.  The only valid options are: ${possibleNodeEnvs.toString()}`;
    throw new Error(msg);
  }

  // grab and set vars from package.json.  They are needed for other env vars
  process.env.APP_NAME = pkg.name;
  process.env.VERSION = pkg.version;
  process.env.APP_ROOT = path.dirname(require.main.filename);

  // merge all variables together
  process.env = _.defaultsDeep({}, process.env);
};

const start = () => {
  setUpEnvVars();
  logger.info(`Node version is: ${process.version}`);
  return server;
};

module.exports = start;

// start the app if this is from the command line
if (!module.parent) {
  start();
}
