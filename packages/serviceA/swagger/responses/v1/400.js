module.exports = {
  description: "Bad Request",
  schema: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        description: "HTTP status code",
        default: 400
      },
      error: {
        type: "string",
        description: "Name of HTTP status code",
        default: "Bad Request"
      },
      message: {
        type: "string",
        description: "Description of the error",
        default: "Bad Request"
      }
    }
  }
};
