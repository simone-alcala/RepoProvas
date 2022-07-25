import prisma from './../config/database.js'

import { Disciplines } from '@prisma/client';

export async function findById(id: number){
  return await prisma.disciplines.findFirst( { where: { id } } ) as Disciplines;
}

export async function findAll(){
  return await prisma.disciplines.findMany( ) as [Disciplines];
}

export async function findByTermId(termId: number){
  return await prisma.disciplines.findMany( { where: { termId } } ) as [Disciplines];
}