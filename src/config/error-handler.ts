import { boomify, isBoom, preconditionRequired } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import logger from '../util/logger';

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  const accept = req.accepts('json', 'html', 'text');
  logger.error(error);

  const boom = boomify(error, { override: !isBoom(error), statusCode: error.errorCode });
  boom.reformat(process.env.NODE_ENV !== 'production');

  if (accept === 'json') {
    res.status(boom.output.statusCode).json({ ...boom.output.payload, data: boom.data });
  }
  else if (accept === 'html') {
    res.status(boom.output.statusCode).render('error', { title: 'Error', error: boom.output.payload });
  }
  else if (accept === 'text') {
    res.status(boom.output.statusCode).send(boom.output.payload);
  }
};

export const tokenError = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.name === 'UnauthorizedError') {
    next(preconditionRequired(error));
  }

  next(error);
};
