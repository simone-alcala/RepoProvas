import { Categories, Teachers, Disciplines, Terms, TeachersDisciplines, Users } from '@prisma/client';
import supertest from 'supertest';

import { faker } from '@faker-js/faker';

import app from './../app.js';
import prisma from './../config/database.js'
import { signIn, signUp } from '../services/authService.js';


describe('Tests test suite', () => {
  
  it('Should add new test successfuly', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(201);
  });

  it('Should return 401, invalid token', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = 'abc123';
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(401);
  });

  it('Should return 422, invalid name', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: '',
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(422);
  });

  it('Should return 422, invalid pdfUrl', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: 'test123',
      categoryId: newCategory.id,
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(422);
  });

  it('Should return 422, missing category attribute', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(422);
  });

  it('Should return 422, missing teacher attribute', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(422);
  });
  
  it('Should return 422, missing discipline attribute', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: newTeacher.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(422);
  });

  it('Should return 404, category not found', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    const newTeacherDiscipline = await prisma.teachersDisciplines.create( {data: { teacherId: newTeacher.id, disciplineId: newDiscipline.id } } ) as TeachersDisciplines;

    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: 0,
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it('Should return 404, relation teacher not found', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    
    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: 0,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it('Should return 404, discpline not found', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
        
    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: newTeacher.id,
      disciplineId: 0
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });

  it('Should return 404, relation teacher/discpline not found', async() => {

    const email = faker.internet.email();
    const password = '123456'

    await signUp({ email, password });
    
    const token = await signIn( { email , password } );
    
    const newCategory = await prisma.categories.create( {data: { name: faker.word.noun() } } ) as Categories;
    const newTeacher = await prisma.teachers.create( {data: { name: faker.word.noun() } } ) as Teachers;
    const newTerm = await prisma.terms.create( {data: { number: faker.datatype.number() } } ) as Terms;
    const newDiscipline = await prisma.disciplines.create( {data: { name: faker.word.noun(), termId: newTerm.id } } ) as Disciplines;
    
    const body = {
      name: faker.word.noun(),
      pdfUrl: faker.internet.url(),
      categoryId: newCategory.id,
      teacherId: newTeacher.id,
      disciplineId: newDiscipline.id
    }

    const response = await supertest(app).post('/tests').send(body).set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
  });
 
});