import { badRequest, unauthorized } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import jwt from 'express-jwt';
import { validationResult } from 'express-validator/check';
import { JWT_SECRET } from '../util/secrets';
import { User } from '../models';

export const validationGuard = (req: Request, res: Response, next: NextFunction) => {
  const error = validationResult(req).formatWith(
    ({ msg, param, value }): InterfaceError => ({
      param,
      value,
      message: msg,
    }),
  );

  if (!error.isEmpty()) {
    return next(badRequest('validation errors', error.array()));
  }
  return next();
};

export const authGuard = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { id } = req.user;
  let user;

  try {
    user = await User.scope(['excludePass']).findOne({ where: { id } });
  } catch (err) {
    return next(err);
  }

  if (!user) {
    return next(unauthorized('User not found'));
  }

  req.user = user;
  return next();
};

export const tokenGuard = (req: Request, res: Response, next: NextFunction) => jwt({ algorithms: ['HS256'], secret: JWT_SECRET })(req, res, next);
