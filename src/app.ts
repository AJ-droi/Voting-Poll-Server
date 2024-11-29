import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes";
import swaggerUi from 'swagger-ui-express';
import { config as swaggerConfig } from './config/swagger';  // Importing Swagger config

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  private initializeRoutes(): void {
    this.app.use("/", routes);
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
  }
}

export default new App().app;
