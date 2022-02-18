import { Router } from 'express';
import taskRules from './task.rules';
import * as controller from './task.controller';
import { validationGuard } from '../../config/guards';

const router = Router();
router.post('/create-task',taskRules.forCreate, validationGuard, controller.createTask);

router.get('/list-tasks', controller.listTasks);


export default router;
