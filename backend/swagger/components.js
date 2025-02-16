module.exports = {
  schemas: {
    BuyerProfile: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
        phone: { type: 'string' },
        preferences: {
          type: 'object',
          properties: {
            location: { type: 'string' },
            priceRange: {
              type: 'object',
              properties: {
                min: { type: 'number' },
                max: { type: 'number' }
              }
            },
            propertyType: { type: 'string' }
          }
        }
      },
      required: ['name', 'email']
    },
    Listing: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        description: { type: 'string' },
        price: { type: 'number' },
        location: { type: 'string' },
        propertyType: { type: 'string' },
        features: {
          type: 'array',
          items: { type: 'string' }
        },
        images: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      required: ['title', 'price', 'location']
    }
  }
};
