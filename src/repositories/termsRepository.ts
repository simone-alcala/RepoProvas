import prisma from './../config/database.js'

import { Terms } from '@prisma/client';

export async function findAll(){
  return await prisma.terms.findMany( ) as [Terms];
}