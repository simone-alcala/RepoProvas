import { Router } from 'express';

import { signUp, signIn } from './../controllers/authController.js';
import validateSchemaMiddleware from './../middleware/validateSchemaMiddleware.js';
import authSchema from '../schemas/authSchema.js';

const authRouter = Router();

authRouter.post('/sign-up', validateSchemaMiddleware(authSchema), signUp);
authRouter.post('/sign-in', validateSchemaMiddleware(authSchema), signIn);

export default authRouter;