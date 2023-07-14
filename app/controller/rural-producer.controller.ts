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
import { RuralProducer } from '../model/rural-producer.model';
import { RuralProducerRepository } from '../repositories/rural-producer.repository';

@injectable()
@Controller('/rural-producer')
export class RuralProducerController {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository
  ) {}

  @Get('/')
  public async getAllPlantingCrops(@Res() res: Response) {
    try {
      const ruralProducers = await this.ruralProducerRepository.getAll();
      return res.status(200).json(ruralProducers);
    } catch (err) {
      return res.status(500).json({
        error: 'Error retrieving PlantingCrops',
        details: err,
      });
    }
  }

  @Get('/:id')
  public async getRuralProducerById(
    @Res() res: Response,
    @Param('id') id: number
  ) {
    try {
      const response = await this.ruralProducerRepository.getById(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving PlantingCrop' });
    }
  }

  @Post('/')
  public async postRuralProducer(
    @Res() res: Response,
    @Body() body: RuralProducer
  ) {
    try {
      const { plantingCropsIds, ...data } = body; // Array de IDs das PlantingCrop relacionadas

      const ruralProducer = await this.ruralProducerRepository.create(data);

      // if (plantingCropsIds && plantingCropsIds.length > 0) {
      //   for (const plantingCropId of plantingCropsIds) {
      //     const plantingCrop = await PlantingCrop.findByPk(plantingCropId);
      //     console.log(plantingCrop);
      //     if (plantingCrop) {
      //       await ruralProducer.addPlantingCrop(plantingCrop);
      //     }
      //   }
      // }
      const populatedRuralProducer = await ruralProducer.reload(); // Recarregar RuralProducer com as PlantingCrops associadas

      return res.status(201).send(populatedRuralProducer);
    } catch (error) {
      res.status(500).send({ error });
    }
  }

  @Put('/')
  public async update(
    @Res() res: Response,
    @Body() body: RuralProducer
  ): Promise<void> {
    const { id } = body;
    try {
      const updates: Partial<RuralProducer> = body;

      const updatedRuralProducer = await this.ruralProducerRepository.update(
        id,
        updates
      );

      if (updatedRuralProducer) {
        res.status(200).json(updatedRuralProducer);
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
    @Body() body: RuralProducer
  ): Promise<void> {
    try {
      const { id } = body;
      await this.ruralProducerRepository.delete(id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Registry' });
    }
  }
}
