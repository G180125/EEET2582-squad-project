require('dotenv').config();
const swaggerJSDoc = require('swagger-jsdoc');

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Project API Documentation',
      version: '1.0.0',
      description: 'API documentation for the Project Management system',
    },
    servers: [
      {
        url: `http://localhost:${SERVER_PORT}/charitan/api/v1`,
      },
    ],
    components: {
        schemas: {
          User: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                format: 'email',
                description: "User's email address.",
                example: 'user@example.com',
              },
              password: {
                type: 'string',
                format: 'password',
                description: 'Encrypted user password.',
                example: 'hashed_password',
              },
              role: {
                type: 'string',
                description: "User's role in the system.",
                enum: ['admin', 'charity', 'donor'],
                example: 'donor',
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Account creation date and time.',
                example: '2023-01-01T00:00:00Z',
              },
            },
          },
          
          Charity: {
            type: 'object',
            properties: {
              user: {
                type: 'string',
                description: 'Reference ID of the User who owns the charity.',
              },
              companyName: {
                type: 'string',
                description: 'Name of the charity organization.',
                example: 'Helping Hands',
              },
              address: {
                type: 'string',
                description: 'Address of the charity.',
                example: '123 Charity Lane',
              },
              taxCode: {
                type: 'string',
                description: 'Tax identification code of the charity.',
                example: 'TAX12345',
              },
              image: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of image URLs for the charity.',
              },
              video: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of video URLs related to the charity.',
              },
              description: {
                type: 'string',
                description: 'Description of the charity.',
              },
              type: {
                type: 'string',
                enum: ['individual', 'corporate', 'non-profit'],
                description: 'Type of charity organization.',
              },
              stripeId: {
                type: 'string',
                description: 'Stripe ID associated with the charity for payments.',
              },
            },
          },
      
          Project: {
            type: 'object',
            properties: {
              title: {
                type: 'string',
                description: 'Title of the project.',
                example: 'Clean Water Initiative',
              },
              description: {
                type: 'string',
                description: 'Brief description of the project.',
              },
              goalAmount: {
                type: 'number',
                description: 'Goal amount to be raised for the project.',
                example: 5000,
              },
              raisedAmount: {
                type: 'number',
                description: 'Amount already raised for the project.',
                example: 1000,
              },
              createdAt: {
                type: 'string',
                format: 'date-time',
                description: 'Date when the project was created.',
                example: '2023-01-01T00:00:00Z',
              },
              duration: {
                type: 'string',
                description: 'Duration for the project.',
                example: '6 months',
              },
              status: {
                type: 'string',
                enum: ['pending', 'active', 'halt', 'closed', 'deleted'],
                description: 'Current status of the project.',
                example: 'active',
              },
              charity: {
                type: 'string',
                description: 'Reference ID of the Charity associated with the project.',
              },
              region: {
                type: 'string',
                description: 'Region ID for the project’s location.',
              },
              country: {
                type: 'string',
                description: 'Country ID for the project’s location.',
              },
              category: {
                type: 'string',
                description: 'Category ID for the project.',
              },
              account: {
                type: 'string',
                description: 'Account information for funds related to the project.',
              },
              image: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of image URLs for the project.',
              },
              video: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of video URLs for the project.',
              },
            },
          },
          
          Donation: {
            type: 'object',
            properties: {
              user: {
                type: 'string',
                description: 'Reference ID of the Donor making the donation.',
              },
              project: {
                type: 'string',
                description: 'Reference ID of the Project receiving the donation.',
              },
              stripeTransactionId: {
                type: 'string',
                description: 'Transaction ID from Stripe for the donation.',
              },
            },
          },
          
          Category: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the category.',
                example: 'Education',
              },
              subscriptionList: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of Donor IDs subscribed to this category.',
              },
            },
          },
      
          Country: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the country.',
                example: 'Kenya',
              },
              subscriptionList: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of Donor IDs subscribed to this country.',
              },
            },
          },
      
          Region: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Name of the region.',
                example: 'Nairobi',
              },
              subscriptionList: {
                type: 'array',
                items: { type: 'string' },
                description: 'List of Donor IDs subscribed to this region.',
              },
            },
          },
        },
    },      
  },
  apis: ['./swagger-data/*.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
