import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../util/secrets';

export const generateToken = (payload: any, options?: jwt.SignOptions) => jwt.sign(payload, JWT_SECRET, options);
