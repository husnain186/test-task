import { NextFunction, Request, Response } from 'express';
import { Task } from '../../models';

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body;
  try {
    const task: Task = await Task.create({ name });
    res.json({ task: { id: task.id, name: task.name } });
  } catch (e) {
    next(e);
  }
};

export const listTasks = async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    const tasks: Task[] = await Task.findAll({
      attributes: ['id', 'name'],
    });
    res.json({ tasks });
  } catch (e) {
    next(e);
  }
};
