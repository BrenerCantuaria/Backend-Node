import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRouter = new Router();

userRouter.post('/create', UserController.create);

export default userRouter;
