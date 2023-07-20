import { Response } from 'express';
import 'reflect-metadata';
import { DashboardController } from '../../app/controller/dashboard.controller';
import { CropRepository } from '../../app/repositories/crop.repository';
import { FarmRepository } from '../../app/repositories/farm.repository';

describe('Dashboard Controller Tests', () => {
  let dashboardController: DashboardController;
  let cropRepository: CropRepository;
  let farmRepository: FarmRepository;
  let mockResponse: Response;

  beforeEach(() => {
    cropRepository = new CropRepository();
    farmRepository = new FarmRepository();
    dashboardController = new DashboardController(
      cropRepository,
      farmRepository
    );
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should get count of all farms', async () => {
    // Arrange
    jest.spyOn(farmRepository, 'CountAllFarms').mockResolvedValue(5);

    // Act
    await dashboardController.CountAllFarms(mockResponse as Response);

    // Assert
    expect(farmRepository.CountAllFarms).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({ total_farms: 5 });
  });

  it('should handle error when getting count of all farms', async () => {
    // Arrange
    const errorMessage = { error: 'Error retrieving Farm Count' };
    jest.spyOn(farmRepository, 'CountAllFarms').mockRejectedValue(errorMessage);

    // Act
    await dashboardController.CountAllFarms(mockResponse as Response);

    // Assert
    expect(farmRepository.CountAllFarms).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should get count of all farms total area', async () => {
    // Arrange
    jest
      .spyOn(farmRepository, 'CountAllFarmsTotalArea')
      .mockResolvedValue(5000);

    // Act
    await dashboardController.CountAllFarmsTotalArea(mockResponse as Response);

    // Assert
    expect(farmRepository.CountAllFarmsTotalArea).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith({
      total_farms_area: 5000,
      unity: 'hectares',
    });
  });

  it('should handle error when getting count of all farms total area', async () => {
    // Arrange
    const errorMessage = 'Error retrieving Total Area';
    jest
      .spyOn(farmRepository, 'CountAllFarmsTotalArea')
      .mockRejectedValue(errorMessage);

    // Act
    await dashboardController.CountAllFarmsTotalArea(mockResponse as Response);

    // Assert
    expect(farmRepository.CountAllFarmsTotalArea).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should get count of all farms by state', async () => {
    // Arrange
    const farmsByState = [{ state: 'SP', count: 10 }];
    jest
      .spyOn(farmRepository, 'CountAllFarmsByState')
      .mockResolvedValue(farmsByState);

    // Act
    await dashboardController.CountAllFarmsByState(mockResponse as Response);

    // Assert
    expect(farmRepository.CountAllFarmsByState).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(farmsByState);
  });

  it('should handle error when getting count of all farms by state', async () => {
    // Arrange
    const errorMessage = 'Error Farms By State';
    jest
      .spyOn(farmRepository, 'CountAllFarmsByState')
      .mockRejectedValue(errorMessage);

    // Act
    await dashboardController.CountAllFarmsByState(mockResponse as Response);

    // Assert
    expect(farmRepository.CountAllFarmsByState).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });

  it('should get count of all farms by crop', async () => {
    // Arrange
    const farmsByCrop = [{ crop: 'Corn', count: 20 }];
    jest
      .spyOn(cropRepository, 'CountAllFarmsByCrop')
      .mockResolvedValue(farmsByCrop);

    // Act
    await dashboardController.CountAllFarmsByCrop(mockResponse as Response);

    // Assert
    expect(cropRepository.CountAllFarmsByCrop).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(farmsByCrop);
  });

  it('should handle error when getting count of all farms by crop', async () => {
    // Arrange
    const errorMessage = 'Error Farms By Crop';
    jest
      .spyOn(cropRepository, 'CountAllFarmsByCrop')
      .mockRejectedValue(errorMessage);

    // Act
    await dashboardController.CountAllFarmsByCrop(mockResponse as Response);

    // Assert
    expect(cropRepository.CountAllFarmsByCrop).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
