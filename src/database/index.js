import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import Aluno from '../models/Aluno';
import User from '../models/User.js';
import Turma from '../models/Turma.js';

// os models devem ser adicionados no array
const models = [Aluno, User, Turma];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => {
  model.init(connection);
});
