import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

import { Users } from "@prisma/client";
import * as repository from './../repositories/usersRepository.js';

export type DataUser = Omit<Users,'id'>;

dotenv.config();

const SALTROUNDS = +process.env.BCRYPT || 10;
const JWT_KEY = process.env.JWT_KEY;
const JWT_EXPIRATION = 60*60*24;

export async function signUp(userData: DataUser) {
  
  const userSearch = await getUserByEmail(userData.email);
  if (userSearch) throw { type: 'conflict', message: 'Email already registered' };

  const { password } = userData;  
  userData.password = getEncryptedUserPassword(password);  
  
  return await repository.signUp(userData);
}

export async function signIn(userData: DataUser) {

  const userSearch = await getUserByEmail(userData.email);
  if (!userSearch) throw { type: 'not_found', message: 'Invalid user/password' };
  
  await validateUserPassword(userData.password, userSearch.password);

  const token = generateToken(userSearch.id);

  return token;
}

export async function getUserIdByToken(token: string){
  
  const { userId } = decodeToken (token);

  const userData = await repository.getUserById(userId);
  if (!userData) throw { type: 'unprocessable_entity', message: 'Invalid token' };
  
  return userId;
}

async function getUserByEmail(email: string){
  return await repository.getUserByEmail(email);
}

function getEncryptedUserPassword(password: string){
  return bcrypt.hashSync(password, SALTROUNDS);
}

async function validateUserPassword(password: string, hash: string) {
  const match = await bcrypt.compareSync(password, hash);
  if (!match) throw { type: 'not_found', message: 'Invalid user/password' };
}

function generateToken(userId: number) {
  return jwt.sign( { userId }, JWT_KEY, { expiresIn: JWT_EXPIRATION } );
}

function decodeToken (tokenController: string) {

  const token = tokenController.split('Bearer ').join('');
  let infoToken: any;

  jwt.verify(token, JWT_KEY, (err: any, decoded: any) => {
    if (err) throw { type: 'unauthorized', message: 'Invalid token' };
    else infoToken = decoded;
  });

  return infoToken;
}