import User from '../models/User';
import BaseRepository from './BaseRepository';

class UserRepository extends BaseRepository<User> {
  constructor() {
    super('User');
  }

  async getByUsername(username: string): Promise<User | undefined> {
    const repository = this.createRepository();
    return await repository.findOne({ where: { username } });
  }
}

export default new UserRepository();
