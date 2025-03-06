import { Router } from 'express';
import TurmaController from '../controllers/TurmaController';
import loginRequired from '../middlewares/loginRequired';

const routerTurma = new Router();

routerTurma.post('/', loginRequired, TurmaController.store); // Criar turma (Requer login)
routerTurma.get('/', loginRequired, TurmaController.index); // Listar turmas do professor logado
routerTurma.get('/:id', loginRequired, TurmaController.show); // Buscar turma pelo ID
routerTurma.put('/:id', loginRequired, TurmaController.update); // Atualizar turma
routerTurma.delete('/:id', loginRequired, TurmaController.delete); // Soft delete

export default routerTurma;
