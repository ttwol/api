import request from 'supertest';
import { Connection } from 'typeorm';

import { connection } from '../../src/database/connection';
import app from '../../src/app';
import User from '../../src/app/models/User';

const username = 'admin';
const password = 'admin';
let con: Connection;
let token = '';
let user: User;

describe('User Tests', () => {
  beforeAll(async () => {
    con = await connection();
    await con.runMigrations();

    const responseToken = await request(app).post('/sessions').send({
      username,
      password,
    });
    token = responseToken.body.accessToken;
  });

  afterAll(async () => {
    await con.dropDatabase();
    await con.close();
  });

  test('should create user success', async () => {
    const responseUser = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'rodolfo.teobaldo2@gmail.com',
        password: '123',
        role: 'ADMIN',
      });
    expect(responseUser.status).toBe(201);
    user = responseUser.body;
    expect(user.username).toBe('rodolfo.teobaldo2@gmail.com');
    expect(user.role).toBe('ADMIN');
  });

  test('should return error user already in use', async () => {
    const responseUser = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        username: 'admin',
        password: 'admin',
        role: 'ADMIN',
      });
    expect(responseUser.status).toBe(409);
    expect(responseUser.body.error).toBe('username already in use');
  });

  test('should return user list success', async () => {
    const responseUsers = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${token}`);
    expect(responseUsers.status).toBe(200);
    const users = <User[]>responseUsers.body;
    expect(users.length).toBeGreaterThan(0);
  });

  test('should return user by id', async () => {
    const responseUser = await request(app)
      .get(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseUser.status).toBe(200);
    const userExpected = <User>responseUser.body;
    expect(userExpected.id).toBe(user.id);
  });

  test('should update password success', async () => {
    const responseUser = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'admin',
        newPassword: 'admin',
      });
    expect(responseUser.status).toBe(200);
    const userUpdated = responseUser.body;
    expect(userUpdated.username).toBe(username);
  });

  test('should return error when old password not provided', async () => {
    const responseUser = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: '',
        newPassword: 'admin',
      });
    expect(responseUser.status).toBe(400);
  });

  test('should return error when old password is incorrect', async () => {
    const responseUser = await request(app)
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send({
        oldPassword: 'admin2',
        newPassword: 'admin',
      });
    expect(responseUser.status).toBe(401);
  });

  test('should delete user success', async () => {
    const responseUser = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(responseUser.status).toBe(204);
  });

  test('should return error when user not found', async () => {
    const responseUser = await request(app)
      .delete('/users/999')
      .set('Authorization', `Bearer ${token}`);
    expect(responseUser.status).toBe(409);
    expect(responseUser.body.error).toBe('Something is wrong');
  });
});
