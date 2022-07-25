import { Request, Response } from 'express';

import * as service from './../services/testsService.js';
import * as userService from './../services/authService.js';

export async function createTest(req: Request, res: Response) {
  const token = req.headers['authorization'] as string;
  await userService.getUserIdByToken(token);
  const { name, pdfUrl, categoryId, disciplineId, teacherId } = req.body;
  await service.createTest({ name, pdfUrl, categoryId, disciplineId, teacherId });
  res.sendStatus(201); 
}

export async function getAllGroupByDiscipline(req: Request, res: Response) {
  //const token = req.headers['authorization'] as string;
  //await userService.getUserIdByToken(token);
  
  const result = await service.findAllGroupByDiscipline();
  res.status(200).send( result ); 
}

