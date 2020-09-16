import { Field, Type } from "recife";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import TestType from "./TestType";

@Type()
@Entity('tests')
class Test {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  description: string;

  @Column()
  testTypeId: number;

  @Field({ visible: false })
  @ManyToOne(() => TestType, testType => testType.tests)
  @JoinColumn({ name: 'testTypeId' })
  testeType: TestType;
}

export default Test;