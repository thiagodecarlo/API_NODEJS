import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from 'routing-controllers';
import { inject, injectable } from 'tsyringe';
import { PlantingCrop } from '../model/planting-crop.model';
import { PlantingCropRepository } from '../repositories/planting-crops.repository';

@injectable()
@Controller('/planting-crop')
export class PlantingCropController {
  constructor(
    @inject(PlantingCropRepository)
    private readonly plantingCropRepository: PlantingCropRepository
  ) {}

  @Get('/')
  public async getAllPlantingCrops(@Req() req: Request, @Res() res: Response) {
    try {
      const plantingCrops = await this.plantingCropRepository.getAll();
      return res.status(200).json(plantingCrops);
    } catch (err) {
      return res.status(500).json({
        error: 'Error retrieving PlantingCrops',
        details: err,
      });
    }
  }

  @Get('/:id')
  public async getPlantingCropById(
    @Res() res: Response,
    @Param('id') id: number
  ) {
    try {
      const response = await this.plantingCropRepository.getById(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving PlantingCrop' });
    }
  }

  @Post('/')
  public async postPlantingCrop(
    @Res() res: Response,
    @Body() body: PlantingCrop
  ) {
    try {
      let entity = new PlantingCrop();
      entity.name = body.name;
      const response = await this.plantingCropRepository.create(entity);
      return res.status(201).send(response);
    } catch (error) {
      res.status(500).send({ status: error });
    }
  }

  @Put('/')
  public async update(
    @Res() res: Response,
    @Body() body: PlantingCrop
  ): Promise<void> {
    const { id, name } = body;
    try {
      const updates: Partial<PlantingCrop> = {
        name,
      };

      const updatedPlantingCrop = await this.plantingCropRepository.update(
        id,
        updates
      );

      if (updatedPlantingCrop) {
        res.status(200).json(updatedPlantingCrop);
      } else {
        res.status(404).json({ error: 'Registry not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating Registry' });
    }
  }

  @Delete('/')
  public async delete(
    @Res() res: Response,
    @Body() body: PlantingCrop
  ): Promise<void> {
    try {
      const { id } = body;
      await this.plantingCropRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Registry' });
    }
  }
}
