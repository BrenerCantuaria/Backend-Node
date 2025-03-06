// Controladores (lógica de negócio)
import User from '../models/User';

/*
    index -> lista todos os usuários -> GET
    store/create -> cria um novo usuário -> POST
    delete -> apaga um usuário -> DELETE
    show -> mostra um usuário -> GET
    update -> atualiza um usuário -> PATCH ou PUT
*/

class UserController {
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email'] });
      return res.json(users);
    } catch (error) {
      return res.json({ error: 'Server Internal Error Find' });
    }
  }

  async create(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (error) {
      // console.log(error);
      res.status(400).json({
        erros: error.errors.map((err) => {
          return err.message;
        }),
      });
    }
  }

  async show(req, res) {
    try {
      const id_params = req.params.id;
      const user = await User.findByPk(id_params);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
      const { id, nome, email } = user;
      return res.json({ id, nome, email });
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async update(req, res) {
    try {
      console.log(req.userId);
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const userUpdated = await user.update(req.body);

      return res.json(userUpdated);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID não enviado' });
      }

      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      await user.destroy();

      return res.status(200).json(`${user} deletado com sucesso`);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export default new UserController();
