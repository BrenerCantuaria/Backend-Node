import { Sequelize, Model } from 'sequelize';

class Turma extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.DataTypes.STRING,
        descricao: Sequelize.DataTypes.TEXT,
        ano: Sequelize.DataTypes.INTEGER,
        status: {
          type: Sequelize.DataTypes.ENUM('ativa', 'inativa'),
          defaultValue: 'ativa',
        },
      },
      {
        sequelize,
        tableName: 'turmas',
        timestamps: true,
      }
    );
  }
  //Define um relacionamento "pertence a" (1:N ou N:1)
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'professor' }); // Uma turma pertence a um usuário 
    this.hasMany(models.Aluno, { foreignKey: 'turma_id', as: 'alunos' }); //  Uma turma pode ter vários alunos
  }
}

export default Turma;
