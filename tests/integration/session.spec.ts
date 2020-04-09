import request from 'supertest';
import { Connection } from 'typeorm';

import { connection } from '../../src/database/connection';
import app from '../../src/app';

const username = 'admin';
const password = 'admin';
let con: Connection;

describe('Session Application', () => {
  beforeAll(async () => {
    con = await connection();
    await con.runMigrations();
  });

  afterAll(async () => {
    await con.dropDatabase();
    await con.close();
  });

  it('should return access token success', async () => {
    const responseToken = await request(app).post('/sessions').send({
      username,
      password,
    });
    expect(responseToken.body.accessToken).toBeDefined();
    expect(responseToken.body.accessToken.length).toBeGreaterThan(0);
  });

  it('should return status code 400 when send empty username', async () => {
    const responseToken = await request(app).post('/sessions').send({
      username: '',
      password,
    });
    expect(responseToken.status).toBe(400);
  });

  it('should return status code 400 when send empty password', async () => {
    const responseToken = await request(app).post('/sessions').send({
      username,
      password: '',
    });
    expect(responseToken.status).toBe(400);
  });

  it('should return error when the user sent does not exist', async () => {
    const responseToken = await request(app).post('/sessions').send({
      username: 'admin2',
      password,
    });
    expect(responseToken.status).toBe(401);
    expect(responseToken.body.error).toBe(
      'User not found or incorreted password'
    );
  });

  it('should return error when password is not valid', async () => {
    const responseToken = await request(app).post('/sessions').send({
      username,
      password: 'admin2',
    });
    expect(responseToken.status).toBe(401);
    expect(responseToken.body.error).toBe(
      'User not found or incorreted password'
    );
  });
});
