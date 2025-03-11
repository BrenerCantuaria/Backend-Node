import { Sequelize, Model } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.DataTypes.STRING,
        data_nascimento: Sequelize.DataTypes.DATEONLY,
        sexo: Sequelize.DataTypes.ENUM('M', 'F', 'Outro'),
        cpf: Sequelize.DataTypes.STRING(11),
        rg: Sequelize.DataTypes.STRING(20),
        telefone: Sequelize.DataTypes.STRING(15),
        email: Sequelize.DataTypes.STRING,
      },
      {
        sequelize,
        tableName: 'alunos',
        timestamps: true,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Turma, { foreignKey: 'turma_id', as: 'turma' });
  }
}
