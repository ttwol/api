import * as bcrypt from 'bcryptjs';

import { ValidationError } from 'apollo-server-core';
import { UserRepository } from "../../repositories/UserRepository";
import { ISessionInput } from "./types/SessionTypes";

import User from "../../models/User";
import Session from '../../models/Session';
import { ITokenProvider } from '../../providers/ITokenProvider';


export class SessionService {
  constructor(
    private userRepository: UserRepository,
    private tokenProvider: ITokenProvider
  ) {}

  async login(loginInput: ISessionInput): Promise<Session> {
    let user = await this.userRepository.getByEmail(loginInput.email);
    if (!user) {
      throw new ValidationError("Usuário ou senha inválidos");
    }

    if(!await this.checkPasswordIsValid(user, loginInput.password)) {
      throw new ValidationError("Usuário ou senha inválidos");
    }

    return new Session(this.tokenProvider.createToken({ username: user.username }));
  }

  async checkPasswordIsValid({ password }: User, passwordUser: string): Promise<boolean> {
    return await bcrypt.compare(passwordUser, password);
  }
}