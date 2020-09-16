import { getCustomRepository } from "typeorm";
import { TestRepository } from "../../repositories/TestRepository";
import { TestService } from "./TestService";

const testRepository = getCustomRepository(TestRepository);

const testService = new TestService(testRepository);

export { testService };