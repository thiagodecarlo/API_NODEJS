import { injectable } from 'tsyringe';
import { IPlantingCrop } from '../interfaces/model/iplanting-crops';
import { PlantingCrop } from '../model/planting-crop.model';
import { RepositoryBase } from './repository-base';

@injectable()
export class PlantingCropRepository extends RepositoryBase<
  PlantingCrop,
  IPlantingCrop
> {
  constructor() {
    super(PlantingCrop);
  }

  public async create(
    plantingCrops: Partial<PlantingCrop>
  ): Promise<PlantingCrop> {
    try {
      const createdPlantingCrops = await PlantingCrop.create(plantingCrops);
      return createdPlantingCrops;
    } catch (error) {
      throw new Error('Error creating PlantingCrops in database');
    }
  }

  public async update(
    id: number,
    updates: Partial<PlantingCrop>
  ): Promise<PlantingCrop | null> {
    try {
      const plantingCrops = await PlantingCrop.findByPk(id);
      if (plantingCrops) {
        updates.updatedAt = new Date();
        const updated = await plantingCrops.update(updates);
        return updated;
      }
      return null;
    } catch (error) {
      throw new Error('Error when updating PlantingCrops in the database');
    }
  }

  public async delete(id: number): Promise<void> {
    try {
      const plantingCrops = await PlantingCrop.findByPk(id);
      if (plantingCrops) {
        await plantingCrops.destroy();
      }
    } catch (error) {
      throw new Error('Error deleting PlantingCrops from database');
    }
  }
}
