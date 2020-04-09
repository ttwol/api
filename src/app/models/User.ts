import * as bcrypt from 'bcryptjs';

import Model from './Model';
import {
  Entity,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['username'])
class User extends Model {
  @Column()
  username!: string;

  @Column()
  password!: string;

  @Column()
  role!: string;

  @Column()
  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt!: Date;

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}

export default User;
