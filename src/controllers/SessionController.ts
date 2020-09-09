import { Mutation } from "recife";
import { ISessionInput } from "../services/SessionService/types/SessionTypes";
import { sessionService } from '../services/SessionService';
import Session from "../models/Session";

class SessionController {

  @Mutation()
  async login(input: ISessionInput): Promise<Session> {
    return sessionService.login(input);
  }
}

export default SessionController;