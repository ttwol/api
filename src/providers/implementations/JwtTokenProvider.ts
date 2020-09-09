import jwt from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { ITokenProvider } from "../ITokenProvider";

export class JwtTokenProvider implements ITokenProvider {
  
  createToken(body: any): string {
    console.log("entrou token");
    return jwt.sign(body, authConfig.secret, {
        expiresIn: authConfig.expiresIn
      });
  }
}