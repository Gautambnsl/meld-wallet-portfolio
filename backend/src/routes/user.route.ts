import { Router } from 'express';
import validator from '../validation';
import { signInSchema, signUpSchema } from '../validation/user.validation';
import { login, register } from '../controller/user.controller';

const router = Router();

router.post('/signup', validator(signUpSchema, 'body'), register);
router.post('/signin', validator(signInSchema, 'body'), login);

export default router;
