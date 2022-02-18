import {compareSync, hashSync, genSaltSync } from 'bcrypt-nodejs';

export const encryptPassword = (password: string) => {
  return hashSync(password, genSaltSync());
};

export const verifyPassword = (password: string, savedPassword: string): boolean => {
  return compareSync(password, savedPassword);
};
