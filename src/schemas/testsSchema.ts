import Joi from 'joi';
import { DataControllerTest } from './../services/testsService.js';

const testsSchema = Joi.object<DataControllerTest>({
  name:  Joi.string().trim().required(),
  pdfUrl: Joi.string().trim().uri(),
  categoryId: Joi.number().integer().required(),
  teacherId: Joi.number().integer().required(),
  disciplineId: Joi.number().integer().required()
})

export default testsSchema;