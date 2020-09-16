import Test from "../../models/Test";
import { TestRepository } from "../../repositories/TestRepository";
import { ICreateTestInput, IUpdateTestInput } from "./types/TestTypes";

export class TestService {
  constructor(
    private testRepository: TestRepository
  ) {}

  async getById(id: number): Promise<Test> {
    return this.testRepository.findOne(id, {
      relations: ['testeType']
    });
  }

  async getAll(): Promise<Test[]> {
    return this.testRepository.getAll();
  }

  async create(testTypeInput: ICreateTestInput): Promise<Test> {
    const testType = this.testRepository.create(testTypeInput);
    console.log(testType);
    return this.testRepository.createTestType(testType);
  }

  async update(testTypeInput: IUpdateTestInput): Promise<Test> {
    const testType = await this.testRepository.create(testTypeInput);
    return await this.testRepository.updateTestType(testType);
  }

  async delete(id: number): Promise<boolean> {
    return this.testRepository.deleteTestType(id);
  }
}