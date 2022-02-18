import { NextFunction, Response } from 'express';
import { generateToken } from './auth.helper';
import { User } from "../../models";

export const login = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const user: User  = req.user;

  const jwt: string = generateToken(user, { expiresIn: '24h' });

  res.json({ jwt });
};
