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
}
