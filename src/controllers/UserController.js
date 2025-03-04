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
}

export default new UserController();
