const express = require("express");
const swaggerTools = require("swagger-tools");
const bunyan = require("bunyan");
const bodyParser = require("body-parser");
const bunyanMiddleware = require("bunyan-middleware");

const conditionalCorsMiddleWare = require("./middlewares/conditionalCors");

const logger = bunyan.createLogger({ name: "serviceA" });
const app = express();
const port = process.env.PORT || 5000;

// swaggerRouter configuration
const options = {
  controllers: "./controllers",
  useStubs: process.env.NODE_ENV === "development" // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
const swaggerConfig = require("./swagger");

app.get("/healthcheck.html", (req, res) => res.send("YESOK"));

app.use(conditionalCorsMiddleWare);
app.use(bunyanMiddleware({ logger }));

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerConfig, middleware => {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());
  app.use(middleware.swaggerMetadata());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // upload file size limit
  app.use(
    bodyParser.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000
    })
  );

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  // Start the server
  app.listen(port);

  logger.info(`serviceA RESTful API server started on: ${port}`);
});
