import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller.js';

const router: Router = Router();
const controller = new AuthController();

router.get('/verify', controller.verifyToken);
router.post('/login', controller.loginAuth);

export default router;
