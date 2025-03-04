'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'alunos',
      {
        id: {
          type: Sequelize.DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        nome: { type: Sequelize.DataTypes.STRING, allowNull: false },
        data_nascimento: {
          type: Sequelize.DataTypes.DATEONLY,
          allowNull: false,
        },
        sexo: {
          type: Sequelize.DataTypes.ENUM('M', 'F', 'Outro'),
          allowNull: false,
        },
        cpf: {
          type: Sequelize.DataTypes.STRING(11),
          unique: true,
          allowNull: false,
        },
        rg: {
          type: Sequelize.DataTypes.STRING(20),
          unique: true,
          allowNull: true,
        },
        telefone: { type: Sequelize.DataTypes.STRING(15), allowNull: true },
        email: {
          type: Sequelize.DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
      },
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('aluno');
  },
};
