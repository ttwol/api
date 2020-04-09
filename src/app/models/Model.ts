import { PrimaryGeneratedColumn } from 'typeorm';

class Model {
  @PrimaryGeneratedColumn()
  id!: number;
}

export default Model;
