import { getCustomRepository } from "typeorm";
import { TestTypeRepository } from "../../repositories/TestTypeRepository";
import { TestTypeService } from "./TestTypeService";

const testTypeRepository = getCustomRepository(TestTypeRepository);

const testTypeService = new TestTypeService(testTypeRepository);

export { testTypeService };