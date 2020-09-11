import * as jwt from 'jsonwebtoken';
import { ITokenProvider } from "../ITokenProvider";
import { authConfig } from '../../config/auth';

export class JwtTokenProvider implements ITokenProvider {
  
  createToken(payload: any): string {
    return jwt.sign(payload, authConfig.secret, {
      expiresIn: authConfig.expiresIn
    });
  }
}