import { DataTypes, Model } from 'sequelize';
import { PostgreSequelizeConnector } from '../config/database/postgresql-config';
import { TableNames } from '../config/database/table-names.enum';
import { PlantingCrop } from './planting-crop.model';
import { RuralProducerPlantingCrops } from './rural-producer-planting-crops';

class RuralProducer extends Model implements IRuralProducer {
  public id: number;
  public name: string;
  public document: string;
  public propertyName: string;
  public city: string;
  public state: string;
  public totalArea: number;
  public arableArea: number;
  public vegetationArea: number;
  public active: boolean = true;
  public createdAt: Date = new Date();
  public updatedAt: Date = new Date();
  public plantingCrops: PlantingCrop[];
  public plantingCropsIds: number[];
}

RuralProducer.init(
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
    modelName: 'RuralProducer',
    tableName: TableNames.RURAL_PRODUCERS,
  }
);

RuralProducer.belongsToMany(PlantingCrop, {
  through: 'RuralProducerPlantingCrops',
  foreignKey: 'idRuralProducer',
  constraints: true,
});

PlantingCrop.belongsToMany(RuralProducer, {
  through: 'RuralProducerPlantingCrops',
  foreignKey: 'idPlantingCrop',
  constraints: true,
});

RuralProducer.hasMany(RuralProducerPlantingCrops, {
  foreignKey: 'idRuralProducer',
});
RuralProducerPlantingCrops.belongsTo(RuralProducer, {
  foreignKey: 'idRuralProducer',
});
PlantingCrop.hasMany(RuralProducerPlantingCrops, {
  foreignKey: 'idPlantingCrop',
});
RuralProducerPlantingCrops.belongsTo(PlantingCrop, {
  foreignKey: 'idPlantingCrop',
});

export { RuralProducer };
