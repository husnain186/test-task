import { Router } from 'express';
import passport from 'passport';
import { validationGuard } from '../../config/guards';
import * as authController from './auth.controller';
import authRules from './auth.rules';

const router = Router();

router
  .route('/login')
  .post(authRules.forLogin, validationGuard, passport.authenticate('local', { session: false }), authController.login);

export default router;
