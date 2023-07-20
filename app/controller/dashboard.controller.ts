import { Response } from 'express';
import { Controller, Get, Res } from 'routing-controllers';
import { inject, injectable } from 'tsyringe';
import { CropRepository } from '../repositories/crop.repository';
import { FarmRepository } from '../repositories/farm.repository';

@injectable()
@Controller('/dashboard')
export class DashboardController {
  constructor(
    @inject(CropRepository)
    private readonly cropRepository: CropRepository,
    @inject(FarmRepository) private readonly farmRepository: FarmRepository
  ) {}

  @Get('/farms-count')
  public async CountAllFarms(@Res() res: Response) {
    try {
      const count = await this.farmRepository.CountAllFarms();
      res.status(200).json({
        total_farms: count,
      });
    } catch (err) {
      res.status(500).json({
        error: 'Error retrieving Farm Count',
      });
    }
  }

  @Get('/total-area')
  public async CountAllFarmsTotalArea(@Res() res: Response) {
    try {
      const totalArea = await this.farmRepository.CountAllFarmsTotalArea();
      res.status(200).json({
        total_farms_area: totalArea,
        unity: 'hectares',
      });
    } catch (error) {
      res.status(500).json({ error: 'Error retrieving Total Area' });
    }
  }

  @Get('/chart/farm/state')
  public async CountAllFarmsByState(@Res() res: Response) {
    try {
      const farmsByState = await this.farmRepository.CountAllFarmsByState();
      res.status(200).json(farmsByState);
    } catch (error) {
      res.status(500).json({ error: 'Error Farms By State' });
    }
  }

  @Get('/chart/crop')
  public async CountAllFarmsByCrop(@Res() res: Response) {
    try {
      const farmsByState = await this.cropRepository.CountAllFarmsByCrop();
      res.status(200).json(farmsByState);
    } catch (error) {
      res.status(500).json({ error: 'Error Farms By Crop' });
    }
  }
}
