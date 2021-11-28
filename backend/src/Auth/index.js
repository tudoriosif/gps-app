import { Router } from 'express';
import { loginUser, signupUser } from './controller';


const router = new Router();

router.post('/login', loginUser);

router.post('/signup', signupUser);

export default router;