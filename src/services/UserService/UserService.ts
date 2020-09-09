import { ValidationError } from 'apollo-server-core';
import { UserRepository } from '../../repositories/UserRepository';
import { ICreateUserInput, IUpdateUserInput } from './types/UserTypes';
import * as bcrypt from 'bcryptjs';
import User from "../../models/User";

export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async getById(id: number): Promise<User | null> {
    return this.userRepository.findOne(id);
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  async create(userInput: ICreateUserInput): Promise<User> {
    let user = await this.userRepository.getByEmail(userInput.email);
    if (user) throw new ValidationError("Usuário já existe");

    user = this.userRepository.create(userInput);
    this.hashPassword(user);
    return this.userRepository.createUser(user);
  }

  async update(userInput: IUpdateUserInput): Promise<User> {
    const user = await this.getById(userInput.id);
    this.hashPassword(user);
    return await this.userRepository.updateUser(this.userRepository.create(userInput));
  }

  async delete(id: number): Promise<boolean> {
    const user = await this.getById(id);
    return this.userRepository.deleteUser(user);
  }

  hashPassword(user: User) {
    user.password = bcrypt.hashSync(user.password);
  }
}