import { Sequelize, Model } from 'sequelize';
import bcryptjs from 'bcryptjs';
export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [5, 255],
              msg: 'Campo ter no mínimo 5 e no máximo 255 caracteres',
            },
          },
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email já existe',
          },
          validate: {
            isEmail: {
              args: [5, 255],
              msg: 'Email inválido',
            },
          },
        },
        passwordHash: {
          type: Sequelize.DataTypes.STRING,
          defaultValue: '',
        },
        password: {
          type: Sequelize.DataTypes.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [6, 50],
              msg: 'Campo ter no mínimo 6 e no máximo 50 caracteres',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'users', // Garante que a tabela correta seja usada
      }
    );
    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.passwordHash = await bcryptjs.hash(user.password, 12);
      }
    });
    return this;
  }
}
