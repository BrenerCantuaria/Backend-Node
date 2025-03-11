'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('alunos', 'turma_id', {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'turmas', // Nome da tabela referenciada
        key: 'id',
      },
      onUpdate: 'CASCADE', // Se a turma for atualizada, o relacionamento se mantém
      onDelete: 'CASCADE', // Se a turma for deletada, os alunos também serão
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('alunos', 'turma_id');
  },
};
