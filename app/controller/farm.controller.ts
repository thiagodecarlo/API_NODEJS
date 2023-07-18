import { Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from 'routing-controllers';
import { injectable } from 'tsyringe';
import { Farm } from '../model/farm.model';
import { FarmRepository } from '../repositories/farm.repository';

@injectable()
@Controller('/rural-producer')
export class FarmController {
  constructor(private readonly FarmRepository: FarmRepository) {}

  @Get('/')
  public async getAll(@Res() res: Response) {
    try {
      const farm = await this.FarmRepository.getAll();
      return res.status(200).json(farm);
    } catch (err) {
      return res.status(500).json({
        error: 'Error retrieving PlantingCrops',
        details: err,
      });
    }
  }

  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id') id: string) {
    try {
      const response = await this.FarmRepository.getById(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving PlantingCrop' });
    }
  }

  @Post('/')
  public async postFarm(@Res() res: Response, @Body() body: Farm) {
    try {
      const { cropsIds, ...data } = body; // Array de IDs das PlantingCrop relacionadas
      console.log('----------------------------', body);
      const ruralProducer = await this.FarmRepository.create(data);

      // if (plantingCropsIds && plantingCropsIds.length > 0) {
      //   for (const plantingCropId of plantingCropsIds) {
      //     const plantingCrop = await PlantingCrop.findByPk(plantingCropId);
      //     console.log(plantingCrop);
      //     if (plantingCrop) {
      //       await ruralProducer.addPlantingCrop(plantingCrop);
      //     }
      //   }
      // }
      const populatedFarm = await ruralProducer.reload(); // Recarregar Farm com as PlantingCrops associadas

      return res.status(201).send(populatedFarm);
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  @Put('/')
  public async update(@Res() res: Response, @Body() body: Farm): Promise<void> {
    const { id } = body;
    try {
      const updates: Partial<Farm> = body;

      const updatedFarm = await this.FarmRepository.update(id, updates);

      if (updatedFarm) {
        res.status(200).json(updatedFarm);
      } else {
        res.status(404).json({ error: 'Registry not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating Registry' });
    }
  }

  @Delete('/')
  public async delete(@Res() res: Response, @Body() body: Farm): Promise<void> {
    try {
      const { id } = body;
      await this.FarmRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Registry' });
    }
  }
}
