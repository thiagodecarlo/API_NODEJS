import { Model } from 'sequelize';
import { IFarm } from '../interfaces/model/ifarm';
import { Crop } from '../model/crop.model';
import { Farm } from '../model/farm.model';
import { RepositoryBase } from './repository-base';

export class FarmRepository extends RepositoryBase<Farm, IFarm> {
  constructor() {
    super(Farm);
  }

  public override async getAll(): Promise<Farm[]> {
    try {
      const entities = await Farm.findAll({
        include: [
          {
            model: Crop,
            through: {
              attributes: ['id'],
            },
          },
        ],
      });
      return entities;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async create(farm: Partial<Farm>): Promise<Farm> {
    try {
      const createdFarm = await Farm.create(farm);
      return createdFarm;
    } catch (error) {
      throw new Error('Error creating Farm in database');
    }
  }

  public async update(
    id: string,
    updates: Partial<Farm>
  ): Promise<Farm | null> {
    try {
      const farm = await Farm.findByPk(id);
      if (farm) {
        const updated = await farm.update(updates);
        return updated;
      }
      return null;
    } catch (error) {
      throw new Error('Error when updating Farm in the database');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const farm = await Farm.findByPk(id);
      if (farm) {
        await farm.destroy();
      }
    } catch (error) {
      throw new Error('Error deleting Farm from database');
    }
  }

  public async CountAllFarms(): Promise<number> {
    try {
      const quantity = await Farm.count();
      return quantity;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async CountAllFarmsTotalArea(): Promise<number> {
    try {
      const quantity = await Farm.sum('totalArea');
      return quantity;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async CountAllFarmsByState(): Promise<any> {
    try {
      const byState = await Farm.findAll({ group: 'state' });
      return byState;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async CountAllFarmsByPlantingCrop(): Promise<any> {
    try {
      const byPlantingCrop = await Model.sequelize?.query(
        `SELECT
        [Farm].[id],
        [Farm].[],
        [Farm].[date],
        [PlantingCrop].[name]
        FROM [Farm]
        INNER JOIN [Farm] AS [Farm] ON [PlantingCrop].[name] = [PlantingCrop].[name]
        GROUP BY [PlantingCrop].[PlantingCrop]`
      );

      Farm.findAll({ group: 'state' });
      return byPlantingCrop;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }
}
