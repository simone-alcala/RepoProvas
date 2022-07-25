import { Router } from 'express';

import documentationRouter from './documentationRouter.js';
import authRouter from './authRouter.js';
import testsRouter from './testsRouter.js';

const router = Router();

router.use(documentationRouter);
router.use(authRouter);
router.use(testsRouter);

export default router;