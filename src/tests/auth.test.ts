import supertest from 'supertest';

import { faker } from '@faker-js/faker';

import app from './../app.js';

describe('Auth sign up test suite', () => {
  
  const newUser = {
    email: faker.internet.email(),
    password: '1234'
  }
  
  it('Should sign up successfuly', async() => {
    const response = await supertest(app).post('/sign-up').send(newUser);
    expect(response.status).toBe(201);
  });

  it('Should return 409, duplicated email ', async() => {
    const response = await supertest(app).post('/sign-up').send(newUser);
    expect(response.status).toBe(409);
  });

  it('Should return 422, invalid email ', async() => {
    const body = {
      email: 'testeabc.com',
      password: '1234'
    };
    const response = await supertest(app).post('/sign-up').send(body);
    expect(response.status).toBe(422);
  });

  it('Should return 422, invalid password ', async() => {
    const body = {
      email: faker.internet.email(),
      password: ''
    };
    const response = await supertest(app).post('/sign-up').send(body);
    expect(response.status).toBe(422);
  });

  it('Should return 422, no email ', async() => {
    const body = {
      email: faker.internet.email()
    };
    const response = await supertest(app).post('/sign-up').send(body);
    expect(response.status).toBe(422);
  });

  it('Should return 422, invalid password ', async() => {
    const body = {
      password: '1234'
    };
    const response = await supertest(app).post('/sign-up').send(body);
    expect(response.status).toBe(422);
  });

});

describe('Auth sign in test suite', () => {
  
  const newUser = {
    email: faker.internet.email(),
    password: '1234'
  }

  it('Should sign in successfuly', async() => {
    await supertest(app).post('/sign-up').send(newUser);
    const response = await supertest(app).post('/sign-in').send(newUser);
    expect(response.status).toBe(200);
  });

  it('Should return 404, email not exist ', async() => {
    const body = {
      email: faker.internet.email(),
      password: 'abcd'
    };
    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toBe(404);
  });

  it('Should return 404, password does not match ', async() => {
    const body = {
      email: newUser.email,
      password: 'abcd'
    };
    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toBe(404);
  });

  it('Should return 422, invalid email ', async() => {
    const body = {
      email: 'testeabc.com',
      password: '1234'
    };
    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toBe(422);
  });

  it('Should return 422, invalid password ', async() => {
    const body = {
      email: faker.internet.email(),
      password: ''
    };
    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toBe(422);
  });

  it('Should return 422, no email ', async() => {
    const body = {
      email: faker.internet.email()
    };
    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toBe(422);
  });

  it('Should return 422, invalid password ', async() => {
    const body = {
      password: '1234'
    };
    const response = await supertest(app).post('/sign-in').send(body);
    expect(response.status).toBe(422);
  });

});