const path = require("path");
const pathsHelper = require("../helpers/paths");

const currentFolder = path.resolve(__dirname);
const paths = require("./paths");

module.exports = {
  swagger: "2.0",
  info: {
    title: "serviceA API",
    description: "Routes supported by serviceA api",
    version: "1.0.0"
  },
  schemes: ["https", "http"],
  consumes: ["application/json", "text/plain"],
  produces: ["application/json", "text/plain"],
  tags: [
    {
      name: "Authentication",
      description: "Authentication required routes"
    },
    {
      name: "Users",
      description: "User related routes"
    }
  ],
  parameters: pathsHelper.exportVersionStructure(
    path.join(currentFolder, "parameters")
  ),
  paths,
  definitions: pathsHelper.exportVersionStructure(
    path.join(currentFolder, "definitions")
  ),
  responses: pathsHelper.exportVersionStructure(
    path.join(currentFolder, "responses")
  ),
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      name: "Authorization",
      in: "header"
    }
  }
};
