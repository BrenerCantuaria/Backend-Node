import { Router } from 'express';
import AlunoController from '../controllers/AlunoController';

const routerAluno = new Router();

routerAluno.post('/', AlunoController.store); // Criar aluno
routerAluno.get('/', AlunoController.index); // Listar alunos
routerAluno.get('/:id', AlunoController.show); // Buscar aluno por ID
routerAluno.put('/:id', AlunoController.update); // Atualizar aluno
routerAluno.delete('/:id', AlunoController.delete); // Desativar aluno

export default routerAluno;
