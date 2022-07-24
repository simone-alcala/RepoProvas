import { Request, Response } from 'express';

import * as service from './../services/authService.js';

export async function signUp(req: Request, res: Response) {
  const { email, password } = req.body;
  await service.signUp({ email, password });
  res.sendStatus(201); 
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;
  const token = await service.signIn({ email, password });
  res.status(200).send({ token }); 
}