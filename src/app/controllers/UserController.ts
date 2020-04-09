import { Request, Response } from 'express';

import UserRepository from '../repositories/UserRepository';
import User from '../models/User';

class UserController {
  async getAll(req: Request, res: Response) {
    const users = await UserRepository.findAll();
    res.json(users);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const user = await UserRepository.findOne(id);
    res.json(user);
  }

  async create(req: Request, res: Response) {
    const { username, password, role } = req.body;

    let user = await UserRepository.getByUsername(username);
    if (user) {
      res.status(409).json({ error: 'username already in use' });
      return;
    }

    user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    user.hashPassword();

    var userCreated = await UserRepository.create(user);

    res.status(201).json(userCreated);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    try {
      var user = await UserRepository.findOne(id);
      await UserRepository.delete(String(user.id));
    } catch (e) {
      res.status(409).json({ error: 'Something is wrong' });
      return;
    }

    res.status(204).send();
  }
}

export default new UserController();
