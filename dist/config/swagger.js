"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
// Assuming you're setting the port from environment variables
const port = process.env.PORT || 4250; // Default to 4250 if PORT is not defined
const swagger = {
    swaggerDefinition: {
        info: {
            version: '1.0.0',
            description: "API documentation for your project.",
            title: "Swagger API",
            contact: {
                name: "Ajiri Enoch Osiobe",
                email: "ajiriosiobe@gmail.com",
            },
        },
        // Dynamically set the base URL using the port
        servers: [
            {
                url: `http://localhost:${port}/api`, // Include /api to match your desired base URL
            },
        ],
    },
    apis: ["src/docs/*.yaml"], // Define the path for your API documentation
};
const config = (0, swagger_jsdoc_1.default)(swagger);
exports.config = config;
