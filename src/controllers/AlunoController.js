// Controladores (lógica de negócio)
import Aluno from '../models/Aluno';

class AlunoController {
  async create(req, res) {
    const aluno = await Aluno.create({
      nome: 'maria',
      data_nascimento: '2000-05-15',
      sexo: 'F',
      cpf: '12345678902',
      rg: '1234568',
      telefone: '999999999',
      email: 'maria@example.com',
    });
    res.json(aluno);
  }
}

export default new AlunoController();
