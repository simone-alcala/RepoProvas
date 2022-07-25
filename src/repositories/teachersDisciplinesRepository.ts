import prisma from './../config/database.js'

import { TeachersDisciplines } from '@prisma/client';

export async function findByTeacherIdAndDisplineId(teacherId: number, disciplineId: number){
  return await prisma.teachersDisciplines.findFirst( { 
    where: { teacherId, disciplineId } } ) as TeachersDisciplines;
}

export async function findAll(){
  return await prisma.teachersDisciplines.findMany( ) as [TeachersDisciplines];
}