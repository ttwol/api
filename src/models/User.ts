import { Type, Field } from 'recife';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Type()
@Entity('users')
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Field({ visible: false })
  password: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
  lastLogin: Date;

  @Column({ default: false })
  enabled: boolean;

  @CreateDateColumn()
  @Field({ visible: false })
  createdOn: Date;

  @UpdateDateColumn()
  @Field({ visible: false })
  updatedOn: Date;
}

export default User;
