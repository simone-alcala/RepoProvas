import prisma from './../config/database.js'

import { Users } from '@prisma/client';

import { DataUser } from '../services/authService.js';

export async function signUp(createData: DataUser){
  return await prisma.users.create({ data: createData });
}

export async function getUserById(id: number){
  return await prisma.users.findFirst( { where: { id } } ) as Users;
}

export async function getUserByEmail(email: string){
  return await prisma.users.findFirst( { where: { email } } ) as Users;
}

