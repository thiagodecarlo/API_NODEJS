import { injectable } from 'tsyringe';
import { IFarmCrop } from '../interfaces/model/ifarm-crop';
import { FarmCrop } from '../model/farm-crop.model';
import { RepositoryBase } from './repository-base';

@injectable()
export class FarmCropRepository extends RepositoryBase<FarmCrop, IFarmCrop> {
  constructor() {
    super(FarmCrop);
  }

  public async create(crop: Partial<IFarmCrop>): Promise<IFarmCrop> {
    try {
      const newCrop = await FarmCrop.create(crop);
      return newCrop;
    } catch (error) {
      throw new Error('Error creating Crop in database');
    }
  }

  public async update(
    id: string,
    updates: Partial<IFarmCrop>
  ): Promise<IFarmCrop | null> {
    try {
      const crop = await FarmCrop.findByPk(id);
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
      const crop = await FarmCrop.findByPk(id);
      if (crop) {
        await crop.destroy();
      }
    } catch (error) {
      throw new Error('Error deleting Crops from database');
    }
  }
}
