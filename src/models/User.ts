import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class User extends Model {
  public id: number;
  public email: string;
  public password: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  modelName: 'user',
  paranoid: true,
  underscored: true,
  defaultScope: {
    attributes: {
      exclude: ['updatedAt', 'deletedAt'],
    },
  },
  scopes: {
    excludePass: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    },
  },
  sequelize,
});
