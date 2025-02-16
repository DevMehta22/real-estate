module.exports = {
    paths: {
      '/api/auth/signup': {
        post: {
          summary: 'Register new user',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    Email: { type: 'string' },
                    Password: { type: 'string' },
                    Role: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            201: { description: 'User created successfully' },
            400: { description: 'Invalid input' },
          },
        },
      },
      '/api/auth/login': {
        post: {
          summary: 'Authenticate user',
          tags: ['Authentication'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    Email: { type: 'string' },
                    Password: { type: 'string' },
                  },
                },
              },
            },
          },
          responses: {
            200: { description: 'Successful authentication' },
            400: { description: 'Invalid credentials' },
          },
        },
      },
    },
  };