import { checkSchema } from 'express-validator/check';

export default {
  forLogin: checkSchema({
    email: {
      in: ['body'],
      exists: {
        errorMessage: 'Email is required',
      },
      isEmail: {
        errorMessage: 'Enter Valid Email',
      },
    },
    password: {
      in: ['body'],
      exists: {
        errorMessage: 'Password is required',
      },
    },
  }),
};
