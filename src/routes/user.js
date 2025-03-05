import { Router } from 'express';
import UserController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const userRouter = new Router();
// a ordem de importação de middlewares é importante
userRouter.get('/', loginRequired, UserController.index);
userRouter.post('/create', UserController.create);
userRouter.get('/:id', UserController.show);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.delete);

export default userRouter;
