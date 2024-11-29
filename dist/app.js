"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = require("./config/swagger"); // Importing Swagger config
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.initializeMiddlewares();
        this.initializeRoutes();
    }
    initializeMiddlewares() {
        this.app.use(body_parser_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    initializeRoutes() {
        this.app.use("/", routes_1.default);
        this.app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.config));
    }
}
exports.default = new App().app;
