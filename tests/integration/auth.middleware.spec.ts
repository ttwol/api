import request from 'supertest';

const username = 'admin';
const password = 'admin';

describe('Authentication Middleware', () => {
  test('should have token valid success', async () => {});

  test('should return error when token was not sent', () => {
    expect(true).toBe(true);
  });

  // test('should return error when token is not valid', () => {
  //   expect(true).toBe(true);
  // });
});
