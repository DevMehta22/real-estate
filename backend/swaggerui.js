const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const sellerSwagger = require('./swagger/sellerSwagger');
const buyerSwagger = require('./swagger/buyerSwagger');
const userSwagger = require('./swagger/userSwagger');
const subscriptionSwagger = require("./swagger/subscriptionSwagger")
const components = require('./swagger/components');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Real Estate API',
      version: '1.0.0',
      description: 'API for managing real estate listings, buyer profiles, and user authentication',
    },
    servers: [
      {
        url: 'https://estate-vista-backend.vercel.app' || `http://localhost:${process.env.PORT}`, // ✅ Hardcoded production URL
        description: 'Production server',
      },
    ],
    components: {
      schemas: { 
        ...components.schemas,
      },
      securitySchemes: {
        customAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Token without Bearer prefix'
        },
      },
    },
    security: [{
      customAuth: []
    }],
    paths: {
      ...sellerSwagger.paths,
      ...buyerSwagger.paths,
      ...userSwagger.paths,
      ...subscriptionSwagger.paths
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

module.exports = (app) => {
  // ✅ Serve static files from 'public' folder (needed for favicon, etc.)
  app.use(express.static('public'));

  // ✅ Setup Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customSiteTitle: 'Real Estate API Documentation',
    customCss: '.swagger-ui .topbar { display: none }',
    customfavIcon: '/favicon.ico', // ✅ Correct path
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
      defaultModelsExpandDepth: -1
    }
  }));
};