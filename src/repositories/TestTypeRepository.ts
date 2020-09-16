import { EntityRepository } from "typeorm";
import TestType from "../models/TestType";
import { RepositoryBase } from "./RepositoryBase";

@EntityRepository(TestType)
export class TestTypeRepository extends RepositoryBase<TestType> {
  
  async getAll(): Promise<TestType[]> {
    return this.find({
      relations: ['tests']
    });
  }

  async createTestType(testType: TestType): Promise<TestType> {
    var testType = this.create(testType);
    return this.save(testType);
  }

  async updateTestType(testType: TestType): Promise<TestType> {
    this.update(testType.id, testType);
    return this.findOne(testType.id);
  }

  async deleteTestType(id: number): Promise<boolean> {
    this.delete(id)
    return true;
  }
}