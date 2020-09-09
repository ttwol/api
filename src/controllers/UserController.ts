import { Query, Mutation } from 'recife';

import User from '../models/User';
import { ICreateUserInput, IUpdateUserInput, IUserInput } from '../services/UserService/types/UserTypes';
import { userService } from '../services/UserService';

class UserController {
  @Query()
  getUser(input: IUserInput): Promise<User | undefined> {
    return userService.getById(input.id);
  }

  @Query()
  getUsers(): Promise<User[]> {
    return userService.getAll();
  }

  @Mutation()
  async createUser(input: ICreateUserInput): Promise<User> {
    return userService.create(input);
  }

  @Mutation()
  async updateUser(input: IUpdateUserInput): Promise<User> {
    return userService.update(input);
  }

  @Mutation()
  async deleteUser(input: IUserInput): Promise<boolean> {
    return userService.delete(input.id);
  }
}

export default UserController;
