import TestType from "../../models/TestType";
import { TestTypeRepository } from "../../repositories/TestTypeRepository";
import { ICreateTestTypeInput, IUpdateTestTypeInput } from "./types/TestTypeTypes";

export class TestTypeService {
  constructor(
    private testTypeRepository: TestTypeRepository
  ) {}

  async getAll(): Promise<TestType[]> {
    const teste = await this.testTypeRepository.getAll();
    console.log(teste);
    console.log(teste[0].tests);
    return teste;
  }

  async create(testTypeInput: ICreateTestTypeInput): Promise<TestType> {
    const testType = this.testTypeRepository.create(testTypeInput);
    return this.testTypeRepository.createTestType(testType);
  }

  async update(testTypeInput: IUpdateTestTypeInput): Promise<TestType> {
    const testType = await this.testTypeRepository.create(testTypeInput);
    return await this.testTypeRepository.updateTestType(testType);
  }

  async delete(id: number): Promise<boolean> {
    return this.testTypeRepository.deleteTestType(id);
  }
}