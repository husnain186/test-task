import { Router } from 'express';
import { authGuard, tokenGuard, validationGuard } from '../../config/guards';
import userRules from './user.rules';
import * as controller from './user.controller';
import { tokenError } from '../../config/error-handler';

const router = Router();
router.post('/register', userRules.forCreate, validationGuard, controller.createUser);

router.get('/user', tokenGuard, tokenError, authGuard, controller.me);


export default router;
