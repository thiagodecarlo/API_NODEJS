import sequelize from 'sequelize';
import { IFarm } from '../interfaces/model/ifarm';
import { Farm } from '../model/farm.model';
import { RepositoryBase } from './repository-base';

export class FarmRepository extends RepositoryBase<Farm, IFarm> {
  constructor() {
    super(Farm);
  }

  public async getAllNested(): Promise<IFarm[]> {
    try {
      const entities = await Farm.findAll({
        include: { all: true, nested: true },
      });
      return entities;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async getByIdNested(id: string): Promise<IFarm> {
    try {
      const entity = await Farm.findByPk(id, {
        include: { all: true, nested: true },
      });
      return entity as Farm;
    } catch (err) {
      console.error(err);
      throw new Error('Error getting entity from database:' + err);
    }
  }

  public async create(farm: Partial<IFarm>): Promise<IFarm> {
    try {
      const createdFarm = await Farm.create(farm);
      return createdFarm;
    } catch (error) {
      throw new Error('Error creating Farm in database');
    }
  }

  public async update(
    id: string,
    updates: Partial<IFarm>
  ): Promise<IFarm | null> {
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
      const byState = await Farm.findAll({
        attributes: [
          'state',
          [sequelize.fn('COUNT', sequelize.col('state')), 'count'],
        ],
        group: ['state'],
      });
      return byState;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }
}
