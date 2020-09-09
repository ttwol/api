import User from "../models/User";
import { EntityRepository } from "typeorm";
import { RepositoryBase } from "./RepositoryBase";

@EntityRepository(User)
export class UserRepository extends RepositoryBase<User> {
  
  async getAll(): Promise<User[]> {
    return this.find({
      enabled: true
    });
  }

  async createUser(user: User): Promise<User> {
    var user = this.create(user);
    return this.save(user);
  }

  async updateUser(user: User): Promise<User> {
    this.update(user.id, user);
    return this.findOne(user.id);
  }

  async deleteUser(user: User): Promise<boolean> {
    this.update(user.id, {
      enabled: false
    });
    return true;
  }

  async getByEmail(email: string): Promise<User> {
    return this.findOne({ email: email });
  }
}
