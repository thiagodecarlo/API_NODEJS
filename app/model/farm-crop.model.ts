import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';
import { IFarmCrop } from '../interfaces/model/ifarm-crop';

export class FarmCrop extends Model implements IFarmCrop {
  public FarmId: string;
  public CropId: string;
  public active: boolean = true;
}

FarmCrop.init(
  {
    FarmId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    CropId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: PostgreSequelizeConnector,
    modelName: 'FarmCrop',
    tableName: TableNames.FARMS_CROPS,
  }
);
