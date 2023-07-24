const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Mongo HandsOn',
      version: '1.0.0',
      description: 'An API to interact with Mongo Queries',
    },
    host: 'localhost:3000',
    basePath: '/api/v1',
  },
  apis: ['./routes/*.js'], // Add the path to your routes file or files here
};

const specs = swaggerJsdoc(options);
module.exports = specs;