import { Router } from 'express';

import documentationRouter from './documentationRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use(documentationRouter);
router.use(authRouter);

export default router;