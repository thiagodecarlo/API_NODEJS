import { Request, Response } from 'express';
import { Controller, Get, Req, Res } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';
import { PlantingCropRepository } from '../repositories/planting-crops.repository';
import { RuralProducerRepository } from '../repositories/rural-producer.repository';

@injectable()
@Controller('/dashboard')
export class PlantingCropController {
  constructor(
    @inject(PlantingCropRepository)
    private readonly plantingCropRepository: PlantingCropRepository,
    private readonly ruralProducerRepository: RuralProducerRepository
  ) {}

  @Get('/farms-count')
  public async CountAllFarms(@Req() req: Request, @Res() res: Response) {
    try {
      const count = await this.ruralProducerRepository.CountAllFarms();
      return res.status(200).json({
        total_farms: count,
      });
    } catch (err) {
      return res.status(500).json({
        error: 'Error retrieving Farm Count',
        details: err,
      });
    }
  }

  @Get('/total-area')
  public async CountAllFarmsTotalArea(@Res() res: Response) {
    try {
      const totalArea =
        await this.ruralProducerRepository.CountAllFarmsTotalArea();
      return res.status(200).json({
        total_farms_area: totalArea,
        unity: 'hectares',
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving Total Area' });
    }
  }

  @Get('/chart/farm/state')
  public async CountAllFarmsByState(@Res() res: Response) {
    try {
      const farmsByState =
        await this.ruralProducerRepository.CountAllFarmsByState();
      return res.status(200).json(farmsByState);
    } catch (error) {
      return res.status(500).json({ error: 'Error retrieving Total Area' });
    }
  }
}