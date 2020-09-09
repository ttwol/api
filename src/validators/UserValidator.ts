import { UserInputError } from 'apollo-server-core';
import { ICreateUserInput } from '../services/UserService/types/UserTypes';

class UserValidator {
  createUser(userInput: ICreateUserInput) {
    if (!this.isEmailValid(userInput.email)) {
      throw new UserInputError('Email invalid');
    }
  }

  private isEmailValid(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  }
}

export default UserValidator;
