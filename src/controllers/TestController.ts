import { Mutation, Query } from "recife";
import Test from "../models/Test";
import { testService } from "../services/TestService";
import { ICreateTestInput, ITestInput, IUpdateTestInput } from "../services/TestService/types/TestTypes";

class TestController {
  
  @Query()
  getTest(input: ITestInput): Promise<Test> {
    return testService.getById(input.id);
  }

  @Query()
  getTests(): Promise<Test[]> {
    return testService.getAll();
  }

  @Mutation()
  async createTest(input: ICreateTestInput): Promise<Test> {
    return testService.create(input);
  }

  @Mutation()
  async updateTest(input: IUpdateTestInput): Promise<Test> {
    return testService.update(input);
  }

  @Mutation()
  async deleteTest(input: ITestInput): Promise<boolean> {
    return testService.delete(input.id);
  }
}

export default TestController;