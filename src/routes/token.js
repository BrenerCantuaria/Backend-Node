import { Router } from 'express';
import TokenController from '../controllers/TokenController';

const routerToken = new Router();

routerToken.post('/', TokenController.store);

export default routerToken;
