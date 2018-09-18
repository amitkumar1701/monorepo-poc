const path = require("path");
const pathsHelper = require("../helpers/paths");

const controllerStructure = pathsHelper.getControllerExports(
  `${path.resolve(__dirname)}/${path.parse(__filename).name}`
);
module.exports = pathsHelper.dotifyStructure(controllerStructure);
