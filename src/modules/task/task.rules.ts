import { checkSchema } from 'express-validator/check';

export default {
  forCreate: checkSchema({
    name: {
      in: ['body'],
      exists: {
        errorMessage: 'name is required',
      }
    },
  })
};
