import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

// inicializa a comunicação automaticamente
import './database';

// Middlewares
import logger from './middlewares/logger';

// Routes
import router from './routes/routes';
import userRouter from './routes/user';
import routerToken from './routes/token';
import routerTurma from './routes/turmas';
import routerAluno from './routes/alunos';
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
    this.app.use('/alunos/', routerAluno);
    this.app.use('/users/', userRouter);
    this.app.use('/tokens/', routerToken);
    this.app.use('/turma/', routerTurma);
  }
}

export default new App().app;
