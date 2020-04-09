import User from '../../src/app/models/User';

const password = 'password';
const password2 = 'password2';

describe('User Password', () => {
  test('should generate an hash password', () => {
    const user = new User();
    user.password = 'password';
    user.hashPassword();
    expect(user.password).toHaveLength(60);
  });

  test('should correct password', () => {
    const user = new User();
    user.password = password;
    user.hashPassword();
    expect(user.checkPasswordIsValid(password)).toBe(true);
  });

  test('should incorrect password', () => {
    const user = new User();
    user.password = password;
    user.hashPassword();
    expect(user.checkPasswordIsValid(password2)).toBe(false);
  });
});
