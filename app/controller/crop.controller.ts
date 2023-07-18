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
import { Crop } from '../model/crop.model';
import { CropRepository } from '../repositories/crop.repository';

@injectable()
@Controller('/planting-crop')
export class CropController {
  constructor(
    @inject(CropRepository)
    private readonly cropRepository: CropRepository
  ) {}

  @Get('/')
  public async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const plantingCrops = await this.cropRepository.getAll();
      return res.status(200).json(plantingCrops);
    } catch (err) {
      return res.status(500).json({
        error: 'Error retrieving Crops',
        details: err,
      });
    }
  }

  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id') id: string) {
    try {
      const response = await this.cropRepository.getById(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving Crop' });
    }
  }

  @Post('/')
  public async create(@Res() res: Response, @Body() body: Crop) {
    try {
      let entity = new Crop();
      entity.name = body.name;
      const response = await this.cropRepository.create(entity);
      return res.status(201).send(response);
    } catch (error) {
      res.status(500).send({ status: error });
    }
  }

  @Put('/')
  public async update(@Res() res: Response, @Body() body: Crop): Promise<void> {
    const { id, name } = body;
    try {
      const updates: Partial<Crop> = {
        name,
      };

      const updatedCrop = await this.cropRepository.update(id, updates);

      if (updatedCrop) {
        res.status(200).json(updatedCrop);
      } else {
        res.status(404).json({ error: 'Registry not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error updating Registry' });
    }
  }

  @Delete('/')
  public async delete(@Res() res: Response, @Body() body: Crop): Promise<void> {
    try {
      const { id } = body;
      await this.cropRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Registry' });
    }
  }
}
