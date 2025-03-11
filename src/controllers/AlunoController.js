import Aluno from '../models/Aluno';
import Turma from '../models/Turma';

class AlunoController {
  async store(req, res) {
    try {
      const {
        nome,
        data_nascimento,
        sexo,
        cpf,
        rg,
        telefone,
        email,
        turma_id,
      } = req.body;

      const turma = await Turma.findByPk(turma_id);
      if (!turma) {
        return res.status(404).json({ error: 'Turma não encontrada' });
      }

      const aluno = await Aluno.create({
        nome,
        data_nascimento,
        sexo,
        cpf,
        rg,
        telefone,
        email,
        turma_id,
      });
      return res.status(201).json(aluno);
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async index(req, res) {
    try {
      const alunos = await Aluno.findAll({
        include: [
          { model: Turma, as: 'turma', attributes: ['id', 'nome', 'ano'] },
        ],
      });

      return res.json(alunos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id, {
        include: [
          { model: Turma, as: 'turma', attributes: ['id', 'nome', 'ano'] },
        ],
      });

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      return res.json(aluno);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      await aluno.update(req.body);
      return res.json(aluno);
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const aluno = await Aluno.findByPk(id);

      if (!aluno) {
        return res.status(404).json({ error: 'Aluno não encontrado' });
      }

      // await aluno.update({ status: 'inativo' }); // Soft delete
      await aluno.destroy();
      return res.json({ message: 'Aluno desativado com sucesso' });
    } catch (error) {
      console.error('Erro ao desativar aluno:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new AlunoController();
