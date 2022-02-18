exports.development = {
  dialect: 'sqlite',
  storage: './db/database/database.sqlite',
  seederStorage: 'sequelize',
};

exports.production = {
  dialect: 'sqlite',
  storage: './db/database/database.sqlite',
  seederStorage: 'sequelize',
};
