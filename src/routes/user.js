import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRouter = new Router();
// a ordem de importação de middlewares é importante
// Não deve ir para o sistema final
// o usuário deve acessar apenas seus proprios dados
userRouter.get('/', UserController.index);
userRouter.get('/:id', UserController.show);

userRouter.post('/create', UserController.create);
userRouter.put('/', loginRequired, UserController.update);
userRouter.delete('/', loginRequired, UserController.delete);

export default userRouter;
