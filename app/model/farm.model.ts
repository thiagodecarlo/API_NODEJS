import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';
import { IFarm } from '../interfaces/model/ifarm';
import { FarmCrop } from './farm-crop.model';

const BR_CPF_CNPJ_REGEX =
  /^\d{3}\.\d{3}\.\d{3}-\d{2}$|^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;

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

  static validateDocument(value: string): boolean {
    return BR_CPF_CNPJ_REGEX.test(value);
  }

  static validateArea(
    _totalArea: number,
    _arableArea: number,
    _vegetationArea: number
  ): boolean {
    return +_arableArea + +_vegetationArea <= +_totalArea;
  }
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
    hooks: {
      beforeValidate: (farm: Farm) => {
        if (farm.document && !Farm.validateDocument(farm.document)) {
          throw new Error(
            'Invalid document format. Must be a valid CPF or CNPJ.'
          );
        }
      },
      beforeSave: (farm: Farm) => {
        if (farm.document && !Farm.validateDocument(farm.document)) {
          throw new Error(
            'Invalid document format. Must be a valid CPF or CNPJ.'
          );
        }
      },
    },
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
