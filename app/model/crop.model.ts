import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';
import { ICrop } from '../interfaces/model/icrop';
import { FarmCrop } from './farm-crop.model';

class Crop extends Model implements ICrop {
  id: string;
  public name!: string;
  public active: boolean = true;
}

Crop.init(
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
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
    sequelize: PostgreSequelizeConnector,
    modelName: 'Crop',
    tableName: TableNames.CROPS,
  }
);

Crop.hasMany(FarmCrop, {
  foreignKey: {
    allowNull: false,
  },
  keyType: DataTypes.UUID,
});

FarmCrop.belongsTo(Crop, {
  foreignKey: {
    allowNull: false,
  },
  keyType: DataTypes.UUID,
});

export { Crop };
