import { Model } from 'sequelize';

export interface IBaseModel extends Model {
  id: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
