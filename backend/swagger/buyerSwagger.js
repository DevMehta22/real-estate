module.exports = {
    paths: {
      '/api/buyer/{userId}': {
        post: {
          summary: 'Create a buyer profile',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'userId',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BuyerProfile' },
              },
            },
          },
          responses: {
            201: { description: 'Buyer profile created successfully' },
            400: { description: 'Invalid input' },
          },
        },
        get: {
          summary: 'Get buyer profile',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'userId',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Buyer profile details',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/BuyerProfile' },
                },
              },
            },
            404: { description: 'Buyer profile not found' },
          },
        },
        put: {
          summary: 'Update buyer profile',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'userId',
              required: true,
              schema: { type: 'string' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/BuyerProfile' },
              },
            },
          },
          responses: {
            200: { description: 'Updated buyer profile' },
            404: { description: 'Buyer profile not found' },
          },
        },
        delete: {
          summary: 'Delete buyer profile',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            {
              in: 'path',
              name: 'userId',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: { description: 'Buyer profile deleted successfully' },
            404: { description: 'Buyer profile not found' },
          },
        },
      },
      '/api/buyer/save/{userId}/{propertyId}': {
        get: {
          summary: 'Save a property',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            { in: 'path', name: 'userId', required: true, schema: { type: 'string' } },
            { in: 'path', name: 'propertyId', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Property saved successfully' },
            400: { description: 'Invalid input' },
          },
        },
      },
      '/api/buyer/delete/{userId}/{propertyId}': {
        delete: {
          summary: 'Remove a saved property',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            { in: 'path', name: 'userId', required: true, schema: { type: 'string' } },
            { in: 'path', name: 'propertyId', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Property removed successfully' },
            404: { description: 'Property not found' },
          },
        },
      },
      '/api/buyer/view/{userId}/{propertyId}': {
        get: {
          summary: 'Track viewed property',
          tags: ['Buyer'],
          security: [{ customAuth: [] }],
          parameters: [
            { in: 'path', name: 'userId', required: true, schema: { type: 'string' } },
            { in: 'path', name: 'propertyId', required: true, schema: { type: 'string' } },
          ],
          responses: {
            200: { description: 'Property view tracked successfully' },
            400: { description: 'Invalid input' },
          },
        },
      },
    },
  };