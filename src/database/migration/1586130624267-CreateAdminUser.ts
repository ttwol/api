import { MigrationInterface, getRepository } from 'typeorm';
import User from '../../app/models/User';

export class CreateAdminUser1586130624267 implements MigrationInterface {
  public async up(): Promise<any> {
    const user = new User();
    user.username = 'admin';
    user.password = 'admin';
    user.hashPassword();
    user.role = 'ADMIN';
    const userRepository = getRepository(User);
    const userCreate = userRepository.create(user);
    await userRepository.save(userCreate);
  }

  public async down(): Promise<any> {
    const userRepository = getRepository(User);
    await userRepository.delete({ username: 'admin', role: 'ADMIN' });
  }
}
