import { EntityRepository } from "typeorm";
import Test from "../models/Test";
import { RepositoryBase } from "./RepositoryBase";

@EntityRepository(Test)
export class TestRepository extends RepositoryBase<Test> {
  
  async getAll(): Promise<Test[]> {
    return this.find({
      relations: ['testeType']
    });
  }

  async createTestType(testType: Test): Promise<Test> {
    var testType = this.create(testType);
    return this.save(testType);
  }

  async updateTestType(testType: Test): Promise<Test> {
    this.update(testType.id, testType);
    return this.findOne(testType.id);
  }

  async deleteTestType(id: number): Promise<boolean> {
    this.delete(id)
    return true;
  }
}