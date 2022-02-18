import { DataTypes, literal, Model } from 'sequelize';
import { sequelize } from '../config/sequelize';

export class Task extends Model {
  public id: number;
  public name: string;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt: string;
}

Task.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: DataTypes.STRING,
}, {
  modelName: 'task',
  paranoid: true,
  underscored: true,
  sequelize,
});
