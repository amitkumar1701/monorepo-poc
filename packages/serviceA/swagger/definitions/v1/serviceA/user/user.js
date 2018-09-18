module.exports = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      format: "uint32",
      description: "User id",
      example: 12345
    },
    email: {
      type: "string",
      description: "User email",
      example: "user@domain.com"
    },
    username: {
      type: ["string", "null"],
      description: "User name",
      example: "Joe User"
    },
    createdAt: {
      type: "string",
      description: "User Creation date"
    }
  }
};
