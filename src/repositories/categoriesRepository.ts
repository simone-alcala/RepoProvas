import prisma from './../config/database.js'

import { Categories } from '@prisma/client';

export async function findById(id: number){
  return await prisma.categories.findFirst( { where: { id } } ) as Categories;
}
