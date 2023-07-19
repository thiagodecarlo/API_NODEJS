import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';
import { IFarm } from '../interfaces/model/ifarm';
import { FarmCrop } from './farm-crop.model';

class Farm extends Model implements IFarm {
  id: string;
  public name: string;
  public document: string;
  public propertyName: string;
  public city: string;
  public state: string;
  public totalArea: number;
  public arableArea: number;
  public vegetationArea: number;
  public active: boolean;
  public cropsIds!: string[];
}

Farm.init(
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalArea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    arableArea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    vegetationArea: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    sequelize: PostgreSequelizeConnector,
    modelName: 'Farm',
    tableName: TableNames.FARMS,
  }
);

Farm.hasMany(FarmCrop, {
  foreignKey: {
    allowNull: false,
  },
  keyType: DataTypes.UUID,
});

FarmCrop.belongsTo(Farm, {
  foreignKey: {
    allowNull: false,
  },
  keyType: DataTypes.UUID,
});

export { Farm };
