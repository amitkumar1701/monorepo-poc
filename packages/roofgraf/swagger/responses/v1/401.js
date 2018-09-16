module.exports = {
  description: "Unauthorized",
  schema: {
    type: "object",
    properties: {
      statusCode: {
        type: "integer",
        description: "HTTP status code",
        example: 401
      },
      error: {
        type: "string",
        description: "Name of HTTP status code",
        example: "Unauthorized"
      },
      message: {
        type: "string",
        description: "Description of the error",
        example: "Access denied: Authentication required"
      }
    }
  }
};
