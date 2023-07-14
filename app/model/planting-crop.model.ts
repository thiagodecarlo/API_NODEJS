import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';
export class PlantingCrop extends Model implements IPlantingCrop {
  public id!: number;
  public name!: string;
  public active: boolean = true;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
}

PlantingCrop.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: PostgreSequelizeConnector,
    modelName: 'PlantingCrop',
    tableName: TableNames.PLANTING_CROPS,
  }
);
