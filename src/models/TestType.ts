import { Field, Type } from 'recife';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import Test from "./Test";

@Type()
@Entity('test_types')
class TestType {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string;

  @OneToMany(() => Test, test => test.testeType)
  tests: Test[]
}

export default TestType;