import { sequelize } from './sequelize';

export const initDB = async () => {
  try {
    await sequelize.authenticate();
  }
  catch (err) {
    throw err;
  }
};
