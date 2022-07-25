import prisma from './../config/database.js'

import { Tests } from '@prisma/client';

import { DataCreateTest } from '../services/testsService.js';

export async function create(createData: DataCreateTest){
  return await prisma.tests.create({ data: createData });
}

export async function findAll(){
  return await prisma.tests.findMany( ) as [Tests];
}