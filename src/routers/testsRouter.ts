import { Router } from 'express';

import { createTest, getAllGroupByDiscipline } from './../controllers/testsController.js';
import validateSchemaMiddleware from './../middleware/validateSchemaMiddleware.js';
import testsSchema from '../schemas/testsSchema.js';
import hasToken from '../middleware/validateTokenMiddleware.js';
const testsRouter = Router();

testsRouter.post('/tests', hasToken, validateSchemaMiddleware(testsSchema), createTest);
testsRouter.get('/tests/disciplines', getAllGroupByDiscipline);


export default testsRouter;