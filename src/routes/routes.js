import { Router } from 'express';
import controller from '../controllers/controller';

const router = new Router();

router.get('/', controller.index);

export default router;
