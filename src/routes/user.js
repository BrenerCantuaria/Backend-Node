import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = new Router();

userRouter.get('/', UserController.index);
userRouter.post('/create', UserController.create);
userRouter.get('/:id', UserController.show);
userRouter.put('/:id', UserController.update);
export default userRouter;
