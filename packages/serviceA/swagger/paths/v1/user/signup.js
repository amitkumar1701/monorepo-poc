module.exports = {
  'x-swagger-router-controller': 'v1',
  operationId: 'users.signup',
  summary: 'Create a user',
  description: 'Create a user with a username/password',
  parameters: [
    {
      name: 'payload',
      in: 'body',
      schema: {
        required: ['email', 'password', 'clientId'],
        type: 'object',
        properties: {
          email: {
            type: 'string',
            description: 'Email'
          },
          password: {
            type: 'string',
            format: 'password',
            description: 'Password'
          },
          newsletter: {
            type: 'boolean',
            description: 'Does user want to subscribe to newsletter?',
            default: false,
          },
          clientId: {
            type: 'string',
            description: 'Client ID of the app'
          },
        }
      },
      description: 'Credentials for sign up',
      required: true,
    }
  ],
  tags: ['User'],
  responses: {
    200: {
      $ref: '#/responses/v1.authentication',
    },
    400: require('../../../responses/v1/400'),
    401: require('../../../responses/v1/401'),
  },
};
