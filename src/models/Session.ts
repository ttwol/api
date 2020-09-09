import { Type } from "recife";

@Type()
class Session {
  constructor(token: string) {
    this.token = token;
  }

  token: string;
}

export default Session;