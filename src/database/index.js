import { Sequelize } from 'sequelize';
import databaseConfig from '../config/database.js';
import Aluno from '../models/Aluno';

// os models devem ser adicionados no array
const models = [Aluno];
const connection = new Sequelize(databaseConfig);

models.forEach((model) => {
  model.init(connection);
});
