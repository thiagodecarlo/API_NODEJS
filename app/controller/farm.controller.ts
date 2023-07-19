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
import { IFarm } from '../interfaces/model/ifarm';
import { Crop } from '../model/crop.model';
import { Farm } from '../model/farm.model';
import { FarmCropRepository } from '../repositories/farm-crop.repository';
import { FarmRepository } from '../repositories/farm.repository';

@injectable()
@Controller('/farm')
export class FarmController {
  constructor(
    private readonly FarmRepository: FarmRepository,
    private readonly farmCropRepository: FarmCropRepository
  ) {}

  @Get('/')
  public async getAll(@Res() res: Response) {
    try {
      const farms = await this.FarmRepository.getAllNested();
      res.status(200).json(farms);
    } catch (err) {
      res.status(500).json({
        error: 'Error retrieving Farms',
        details: err,
      });
    }
  }

  @Get('/:id')
  public async getById(@Res() res: Response, @Param('id') id: string) {
    try {
      const farm = await this.FarmRepository.getByIdNested(id);
      res.status(200).json(farm);
    } catch (err) {
      res.status(500).json({
        error: 'Error retrieving Farm',
        details: err,
      });
    }
  }

  @Post('/')
  public async postFarm(@Res() res: Response, @Body() body: IFarm) {
    try {
      const { cropsIds, ...data } = body;
      const farm = await this.FarmRepository.create(data);
      if (cropsIds && cropsIds.length > 0) {
        return new Promise<void>((resolve, reject) => {
          cropsIds.map(async (id) => {
            const crop = await Crop.findByPk(id);
            if (crop) {
              const farmCrop = await this.farmCropRepository.create({
                FarmId: farm.id,
                CropId: id,
              });
            }
          });
          resolve();
        }).then(async () => {
          const populatedFarm = await this.FarmRepository.getByIdNested(
            farm.id
          );
          res.status(201).json(populatedFarm);
        });
      }
    } catch (err) {
      res.status(500).json({
        error: 'Error on recording registries',
        details: err,
      });
    }
  }

  @Put('/')
  public async update(
    @Res() res: Response,
    @Body() body: IFarm
  ): Promise<void> {
    const { id } = body;
    try {
      const updates: Partial<Farm> = body;

      const updatedFarm = await this.FarmRepository.update(id, updates);

      if (updatedFarm) {
        res.status(200).json(updatedFarm);
      } else {
        res.status(404).json({ error: 'Registry not found' });
      }
    } catch (err) {
      res.status(500).json({
        error: 'Error on updating registries',
      });
    }
  }

  @Delete('/')
  public async delete(
    @Res() res: Response,
    @Body() body: IFarm
  ): Promise<void> {
    try {
      const { id } = body;
      await this.FarmRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Registry' });
    }
  }
}
