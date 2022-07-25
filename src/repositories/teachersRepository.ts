import prisma from './../config/database.js'

import { Teachers } from '@prisma/client';

export async function findById(id: number){
  return await prisma.teachers.findFirst( { where: { id } } ) as Teachers;
}

export async function findAll(){
  return await prisma.teachers.findMany( ) as [Teachers];
}