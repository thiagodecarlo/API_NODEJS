import { Model } from 'sequelize';

export interface IBaseModel extends Model {
  id: string;
  active: boolean;
}
