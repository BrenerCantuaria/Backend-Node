// Controladores (lógica de negócio)
import Turma from '../models/Turma';
import User from '../models/User';
/*
    index -> lista todos os usuários -> GET
    store/create -> cria um novo usuário -> POST
    delete -> apaga um usuário -> DELETE
    show -> mostra um usuário -> GET
    update -> atualiza um usuário -> PATCH ou PUT
*/

class TurmaController {
  // Criar uma nova turma (Somente professores autenticados)
  async store(req, res) {
    try {
      const { nome, descricao, ano } = req.body;
      const user_id = req.userId;
      const professor = await User.findByPk(user_id);
      if (!professor) {
        return res.status(404).json({ error: 'Professor não encontrado' });
      }

      // Criar turma associada ao professor autenticado
      const turma = await Turma.create({ nome, descricao, ano, user_id });
      return res.status(201).json(turma);
    } catch (error) {
      console.error('Erro ao criar turma:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Listar todas as turmas do professor autenticado
  async index(req, res) {
    try {
      const user_id = req.userId; // Pegando ID do professor autenticado

      const turmas = await Turma.findAll({
        where: { user_id }, // Filtra apenas turmas criadas pelo professor logado
        include: [
          { model: User, as: 'professor', attributes: ['id', 'nome', 'email'] },
        ],
      });

      return res.json(turmas);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Buscar uma turma específica pelo ID (Somente se pertence ao professor autenticado)
  async show(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.userId;

      const turma = await Turma.findOne({
        where: { id, user_id }, // Verifica se a turma pertence ao professor autenticado
        include: [
          { model: User, as: 'professor', attributes: ['id', 'nome', 'email'] },
        ],
      });

      if (!turma) {
        return res
          .status(404)
          .json({ error: 'Turma não encontrada ou não pertence ao professor' });
      }

      return res.json(turma);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Atualizar uma turma (Somente o professor que criou)
  async update(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.userId;

      const turma = await Turma.findOne({ where: { id, user_id } });
      if (!turma) {
        return res
          .status(404)
          .json({ error: 'Turma não encontrada ou não pertence ao professor' });
      }

      await turma.update(req.body);
      return res.json(turma);
    } catch (error) {
      console.error('Erro ao atualizar turma:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  // Desativar (Soft Delete) uma turma (Somente o professor que criou)
  async delete(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.userId;

      const turma = await Turma.findOne({ where: { id, user_id } });
      if (!turma) {
        return res
          .status(404)
          .json({ error: 'Turma não encontrada ou não pertence ao professor' });
      }

      await turma.update({ status: 'inativa' }); // Soft delete
      return res.json({ message: 'Turma desativada com sucesso' });
    } catch (error) {
      console.error('Erro ao desativar turma:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new TurmaController();
