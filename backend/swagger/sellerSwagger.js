module.exports = {
  paths: {
    '/api/seller/{userId}': {
      post: {
        summary: 'Create a new property listing',
        tags: ['Seller'],
        security: [{ customAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'userId',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Listing' }
            }
          }
        },
        responses: {
          '201': { description: 'Listing created successfully' },
          '400': { description: 'Invalid input' }
        }
      }
    },
    '/api/seller': {
      get: {
        summary: 'Get all listings',
        tags: ['Seller'],
        security: [{ customAuth: [] }],
        responses: {
          '200': {
            description: 'List of all listings',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: { $ref: '#/components/schemas/Listing' }
                }
              }
            }
          }
        }
      }
    },
    '/api/seller/{id}': {
      get: {
        summary: 'Get a single listing by ID',
        tags: ['Seller'],
        security: [{ customAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': {
            description: 'Listing details',
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/Listing' }
              }
            }
          },
          '404': { description: 'Listing not found' }
        }
      },
      put: {
        summary: 'Update a listing',
        tags: ['Seller'],
        security: [{ customAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Listing' }
            }
          }
        },
        responses: {
          '200': { description: 'Updated listing' },
          '404': { description: 'Listing not found' }
        }
      },
      delete: {
        summary: 'Delete a listing',
        tags: ['Seller'],
        security: [{ customAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: { type: 'string' }
          }
        ],
        responses: {
          '200': { description: 'Listing deleted successfully' },
          '404': { description: 'Listing not found' }
        }
      }
    },
    '/api/seller/images/{sellerId}': {
      post: {
        summary: 'Add images to a listing',
        tags: ['Seller'],
        security: [{ customAuth: [] }],
        parameters: [
          {
            in: 'path',
            name: 'sellerId',
            required: true,
            schema: { type: 'string' }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  images: {
                    type: 'array',
                    items: { type: 'string', format: 'binary' }
                  }
                }
              }
            }
          }
        },
        responses: {
          '201': { description: 'Images added successfully' },
          '400': { description: 'Invalid input' }
        }
      }
    }
  }
};
