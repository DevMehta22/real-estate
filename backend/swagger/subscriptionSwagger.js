module.exports = {
  paths: {
    '/api/subscription': {
      post: {
        summary: 'Purchase a subscription',
        description: 'Create a new subscription for the authenticated seller',
        tags: ['Subscription'],
        security: [{ customAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  plan_type: {
                    type: 'string',
                    enum: ['basic', 'premium', 'enterprise'],
                    description: 'Type of subscription plan'
                  }
                },
                required: ['plan_type']
              }
            }
          }
        },
        responses: {
          201: {
            description: 'Subscription created successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    id: { type: 'string' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid request or already has active subscription',
            $ref: '#/components/schemas/ErrorResponse'
          },
          500: {
            description: 'Internal server error',
            $ref: '#/components/schemas/ErrorResponse'
          }
        }
      }
    },
    '/api/subscription/paymentverification': {
      post: {
        summary: 'Verify subscription payment',
        description: 'Verify Razorpay payment for a subscription',
        tags: ['Subscription'],
        security: [{ customAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
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
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Payment verified successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean' },
                    message: { type: 'string' }
                  }
                }
              }
            }
          },
          400: {
            description: 'Invalid signature',
            $ref: '#/components/schemas/ErrorResponse'
          },
          500: {
            description: 'Internal server error',
            $ref: '#/components/schemas/ErrorResponse'
          }
        }
      }
    },
    '/api/subscription/razorpaykey': {
      get: {
        summary: 'Get Razorpay API key',
        description: 'Retrieve the Razorpay API key for client-side integration',
        tags: ['Subscription'],
        security: [{ customAuth: [] }],
        responses: {
          200: {
            description: 'Razorpay key retrieved successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    key: { type: 'string' }
                  }
                }
              }
            }
          },
          500: {
            description: 'Internal server error',
            $ref: '#/components/schemas/ErrorResponse'
          }
        }
      }
    },
    '/api/subsription/': {
      get: {
        summary: 'Check if user is subscribed',
        description: 'Return true if user is subscribed',
        tags: ['Subscription'],
        security: [{ customAuth: [] }],
        responses: {
          200: {
            description: 'You are subscribed/You are not subscribed',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    key: { type: 'string' }
                  }
                }
              }
            }
          },
          500: {
            description: 'Error in checking subscription',
            $ref: '#/components/schemas/ErrorResponse'
          }
        }
      }
    }
  }
};
