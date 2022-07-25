import { Tests } from "@prisma/client";

import * as repositoryTest from './../repositories/testsRepository.js';
import * as repositoryTerms from './../repositories/termsRepository.js';
import * as repositoryCategory from './../repositories/categoriesRepository.js';
import * as repositoryTeacher from './../repositories/teachersRepository.js';
import * as repositoryDiscipline from './../repositories/disciplinesRepository.js';
import * as repositoryTeacherDiscipline from './../repositories/teachersDisciplinesRepository.js';
import { resourceLimits } from "worker_threads";

export interface DataControllerTest {
  name: string;
  pdfUrl: string;
  categoryId: number;
  disciplineId: number;
  teacherId: number;
}

export type DataCreateTest = Omit<Tests,'id'>;

export async function createTest(testData: DataControllerTest) {

  const category = await getCategory(testData.categoryId);
  if (!category) throw { type: 'not_found', message: 'Category id not found' };
  const teacher = await getTeacher(testData.teacherId);
  if (!teacher) throw { type: 'not_found', message: 'Teacher id not found' };
  const discpline = await getDiscipline(testData.disciplineId);
  if (!discpline) throw { type: 'not_found', message: 'Discipline id not found' };
  const teacherDiscipline = await getTeacherAndDispline(testData.teacherId, testData.disciplineId);
  if (!teacherDiscipline) throw { type: 'not_found', message: 'Relation between teacher id and discipline id not found' };
  
  const newData: DataCreateTest = {
    name: testData.name,
    pdfUrl: testData.pdfUrl,
    categoryId: testData.categoryId,
    teacherDisciplineId: teacherDiscipline.id
  }

  return await repositoryTest.create(newData);

}

async function getTeacher(id: number) {
  return await repositoryTeacher.findById(id);
}

async function getDiscipline(id: number) {
  return await repositoryDiscipline.findById(id);
}

async function getCategory(id: number) {
  return await repositoryCategory.findById(id);
}

async function getTeacherAndDispline(teacherId: number, disciplineId: number) {
  return await repositoryTeacherDiscipline.findByTeacherIdAndDisplineId(teacherId, disciplineId);
}

export async function findAllGroupByDiscipline() {
  const tests = await repositoryTest.findAll();
  
  const teachers = await repositoryTeacher.findAll();
  const terms = await repositoryTerms.findAll();
  const teachersDisciplines = await repositoryTeacherDiscipline.findAll();

  const termsReturn = [];

  await Promise.all( terms.map(async(term) => {
    termsReturn.push({
      id: term.id,
      number: term.number,
      disciplines: await repositoryDiscipline.findByTermId(term.id)
    });
  }));

  return termsReturn;
}

