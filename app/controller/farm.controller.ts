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
      const { totalArea, vegetationArea, arableArea, document } = data;

      if (
        Farm.validateDocument(body.document) &&
        Farm.validateArea(totalArea, arableArea, vegetationArea)
      ) {
        const farm = await this.FarmRepository.create(data);

        let _farmId = (farm as Farm).id || (farm as Farm).dataValues.id;
        if (cropsIds && cropsIds.length > 0) {
          const farmCropPromises = cropsIds.map(async (id) => {
            const crop = await Crop.findByPk(id);
            if (crop) {
              await this.farmCropRepository.create({
                FarmId: _farmId,
                CropId: id,
              });
            }
          });

          await Promise.all(farmCropPromises);

          const populatedFarm = await this.FarmRepository.getByIdNested(
            _farmId
          );
          const populatedFarmData = (populatedFarm as Farm).dataValues;
          res.status(201).json(populatedFarmData);
        } else {
          res.status(201).json((farm as Farm).dataValues); // Caso não haja cropsIds, retornar apenas o farm criado
        }
      } else {
        let msg = '';

        if (!Farm.validateDocument(body.document)) {
          msg += 'Verifique os campos document (CPF ou CNPJ); ';
        }

        if (!Farm.validateArea(totalArea, arableArea, vegetationArea)) {
          msg +=
            'totalArea é maior ou igual a soma de arableArea e vegetationArea; ';
        }

        res.status(422).json({
          error: msg,
        });
      }
    } catch (err) {
      console.error(err); // Adicione este log para visualizar o erro específico que ocorre aqui

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
