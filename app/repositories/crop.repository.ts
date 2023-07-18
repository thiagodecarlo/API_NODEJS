import { injectable } from 'tsyringe';
import { ICrop } from '../interfaces/model/icrop';
import { Crop } from '../model/crop.model';
import { RepositoryBase } from './repository-base';

@injectable()
export class CropRepository extends RepositoryBase<Crop, ICrop> {
  constructor() {
    super(Crop);
  }

  public async create(crop: Partial<Crop>): Promise<Crop> {
    try {
      const newCrop = await Crop.create(crop);
      return newCrop;
    } catch (error) {
      throw new Error('Error creating Crop in database');
    }
  }

  public async update(
    id: string,
    updates: Partial<Crop>
  ): Promise<Crop | null> {
    try {
      const crop = await Crop.findByPk(id);
      if (crop) {
        const updated = await crop.update(updates);
        return updated;
      }
      return null;
    } catch (error) {
      throw new Error('Error when updating Crop in the database');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const crop = await Crop.findByPk(id);
      if (crop) {
        await crop.destroy();
      }
    } catch (error) {
      throw new Error('Error deleting Crops from database');
    }
  }

  public async CountAllFarmsByCrop(): Promise<any> {
    try {
      console.log('1');

      const result = await Crop.findAll({
        include: { all: true },
      });
      console.log('2');

      return new Promise((resolve, reject) => {
        const countByPlantingCrop: Record<string, number> = {};

        result.forEach((crop: Crop) => {
          const count = crop.dataValues.FarmCrops.length as number;
          countByPlantingCrop[crop.dataValues.name] = count;
        });
        resolve(countByPlantingCrop);
      })
        .then((ret) => {
          return ret;
        })
        .catch((err) => {
          throw new Error('Error getting entity from database:' + err);
        });
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }
}
