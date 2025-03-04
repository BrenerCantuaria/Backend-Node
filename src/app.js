import express from 'express';
import router from './routes/routes';
import dotenv from 'dotenv';
dotenv.config();

// inicializa a comunicação automaticamente
import './database';
import logger from './middlewares/logger';
class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(logger);
  }

  routes() {
    this.app.use('/', router);
  }
}

export default new App().app;
