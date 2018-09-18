module.exports = {
  schema: {
    type: "object",
    required: ["user", "accessToken", "refreshToken"],
    properties: {
      user: {
        $ref: "#/definitions/v1.serviceA.user.user"
      },
      accessToken: {
        type: "string",
        description: "JSON Web Token (JWT)",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....."
      },
      refreshToken: {
        type: "string",
        description: "Refresh token",
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
      }
    }
  },
  description:
    "An object containing the user, his refresh token and a JSON WebToken for future authentication"
};
