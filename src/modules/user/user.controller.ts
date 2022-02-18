import { NextFunction, Request, Response } from 'express';
import { User } from '../../models';
import { conflict } from '@hapi/boom';
import { encryptPassword } from './user.helper';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    const user: User = await findUserByEmail(email);
    if (user) {
      return next(conflict('email already exists'));
    }
    const encryptedPassword: string = encryptPassword(password);
    const createdUser: User = await User.create({ email, password: encryptedPassword });
    res.json({ user: await User.scope('excludePass').findByPk(createdUser.id) });
  } catch (e) {
    next(e);
  }
};

export const me = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const user: User = req.user;
    res.json({ user });
  } catch (e) {
    next(e);
  }
};

const findUserByEmail = async (email: string) => {
  return User.findOne({ where: { email } });
};
