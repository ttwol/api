import { Mutation, Query } from "recife";
import TestType from "../models/TestType";
import { testTypeService } from "../services/TestTypeService";
import { ICreateTestTypeInput, ITestTypeInput, IUpdateTestTypeInput } from "../services/TestTypeService/types/TestTypeTypes";

class TestTypeController {
  
  @Query()
  getTestTypes(): Promise<TestType[]> {
    return testTypeService.getAll();
  }

  @Mutation()
  async createTestType(input: ICreateTestTypeInput): Promise<TestType> {
    return testTypeService.create(input);
  }

  @Mutation()
  async updateTestType(input: IUpdateTestTypeInput): Promise<TestType> {
    return testTypeService.update(input);
  }

  @Mutation()
  async deleteTestType(input: ITestTypeInput): Promise<boolean> {
    return testTypeService.delete(input.id);
  }
}

export default TestTypeController;