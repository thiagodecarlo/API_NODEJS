import { Model } from 'sequelize';
import { IBaseModel } from '../interfaces/model/ibase-model';

class BaseModel extends Model implements IBaseModel {
  id: string;
  public active: boolean = true;
}

export default { BaseModel };
