import Joi from 'joi';
import { DataUser } from './../services/authService.js';

const authSchema = Joi.object<DataUser>({
  email:  Joi.string().trim().email().required(),
  password: Joi.string().trim().required(),
})

export default authSchema;