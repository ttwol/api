import { UserRepository } from "../../repositories/UserRepository";
import { UserService } from "./UserService";
import { getCustomRepository } from "typeorm";

const userRepository = getCustomRepository(UserRepository);

const userService = new UserService(userRepository);

export { userService };