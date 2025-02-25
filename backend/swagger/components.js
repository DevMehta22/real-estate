module.exports = {
  schemas: {
    ErrorResponse: {
      type: 'object',
      properties: {
        success: { type: 'boolean' },
        message: { type: 'string' }
      }
    },
    SubscriptionRequest: {
      type: 'object',
      properties: {
        plan_type: {
          type: 'string',
          enum: ['basic', 'premium', 'enterprise']
        }
      },
      required: ['plan_type']
    },
    PaymentVerification: {
      type: 'object',
      properties: {
        razorpay_subscription_id: { type: 'string' },
        razorpay_payment_id: { type: 'string' },
        razorpay_signature: { type: 'string' }
      },
      required: [
        'razorpay_subscription_id',
        'razorpay_payment_id',
        'razorpay_signature'
      ]
    },
    RazorpayKeyResponse: {
      type: 'object',
      properties: {
        key: { type: 'string' }
      }
    },
    "BuyerProfile": {
  "type": "object",
  "properties": {
    "contactInfo": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "phone": {
          "type": "string",
          "pattern": "^[0-9]{10}$"
        },
        "address": {
          "type": "string"
        }
      },
      "required": ["address"]
    },
    "preferences": {
      "type": "object",
      "properties": {
        "locations": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "propertyTypes": {
          "type": "array",
          "items": {
            "type": "string"
          }
        },
        "minPrice": {
          "type": "number"
        },
        "maxPrice": {
          "type": "number"
        },
        "minBedrooms": {
          "type": "number"
        },
        "minBathrooms": {
          "type": "number"
        }
      }
    },
    "budget": {
      "type": "number",
      "minimum": 0
    }
  },
  "required": ["contactInfo", "preferences", "budget"]
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
      // required: ['title', 'price', 'location']
    }
  }
};
