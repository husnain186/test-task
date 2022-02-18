import { Router, Request, Response } from 'express';

import { errorHandler, tokenError } from './error-handler';
import { authGuard, tokenGuard } from './guards';
import { notFound } from '@hapi/boom';

const router = Router();
import './passport';

import userRouter from '../modules/user/user.router';
import authRouter from '../modules/auth/auth.router';
import taskRouter from '../modules/task/task.router';

router.get('/', (req: Request, res: Response) => res.json({status: 'ok'}))
router.use(authRouter);
router.use(userRouter);
router.use(tokenGuard, tokenError, authGuard, taskRouter);

// No route found (404 responses)
router.use((req: Request, res: Response) => {
  const accept = req.accepts('json', 'html', 'text');
  const boom =  notFound(`Cannot ${req.method} ${req.path}`);

  if (accept === 'json') {
    res.status(boom.output.statusCode).json(boom.output.payload);
  }
  else if (accept === 'html') {
    res.status(boom.output.statusCode).render('error', { title: 'Error', error: boom.output.payload });
  }
  else if (accept === 'text') {
    res.status(boom.output.statusCode).send(boom.output.payload);
  }
});


// Error Handler
router.use(errorHandler);

export default router;
