import { UserRepository } from "../../repositories/UserRepository";
import { SessionService } from "./SessionService";
import { getCustomRepository } from "typeorm";
import { JwtTokenProvider } from "../../providers/implementations/JwtTokenProvider";

const userRepository = getCustomRepository(UserRepository);
const tokenProvider = new JwtTokenProvider();

const sessionService = new SessionService(userRepository, tokenProvider);

export { sessionService };