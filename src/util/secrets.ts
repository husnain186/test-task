import dotenv from 'dotenv';
dotenv.config();

export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'
export const JWT_SECRET = process.env.JWT_SECRET || 'this is a random JWT secret';
