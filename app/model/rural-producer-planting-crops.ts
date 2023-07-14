import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';

export class RuralProducerPlantingCrops extends Model {
  public id!: number;
}

RuralProducerPlantingCrops.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    sequelize: PostgreSequelizeConnector,
    modelName: 'RuralProducerPlantingCrops',
    tableName: TableNames.RURALPRODUCER_PLANTINGCROPS,
  }
);
