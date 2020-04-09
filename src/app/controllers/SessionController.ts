import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import UserRepository from '../repositories/UserRepository';
import authConfig from '../../config/auth';

class SessionController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
      return;
    }

    const user = await UserRepository.getByUsername(username);
    if (!user) {
      return res
        .status(401)
        .json({ error: 'User not found or incorreted password' });
    }

    if (!user.checkPasswordIsValid(password)) {
      res.status(401).json({ error: 'User not found or incorreted password' });
      return;
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      }
    );

    res.json({ accessToken: token });
  }
}

export default new SessionController();
