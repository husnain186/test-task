import { Request } from 'express';
import { User } from '../models';

declare global {
  type ExtendedRequest = Request & {
    user: User,
  };

  interface InterfaceError {
    param?: string;
    value?: string;
    message?: string;
  }
}
