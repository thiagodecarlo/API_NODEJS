import { Response } from 'express';
import 'reflect-metadata';
import { FarmController } from '../../app/controller/farm.controller';
import { FarmCropRepository } from '../../app/repositories/farm-crop.repository';
import { FarmRepository } from '../../app/repositories/farm.repository';
import { MockHelper } from '../helper/mock-helper';

const mock = new MockHelper();

describe('Farm Controller Tests', () => {
  let farmController: FarmController;
  let farmRepository: FarmRepository;
  let farmCropRepository: FarmCropRepository;
  let mockResponse: Response;

  // Arrange
  const farmsList = mock.getAllFarms();
  const farm = mock.getFarm();

  beforeEach(() => {
    farmRepository = new FarmRepository();
    farmCropRepository = new FarmCropRepository();
    farmController = new FarmController(farmRepository, farmCropRepository);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAllNested method and return farms', async () => {
    // Arrange

    jest.spyOn(farmRepository, 'getAllNested').mockResolvedValue(farmsList);

    // Act
    await farmController.getAll(mockResponse as Response);

    // Assert
    expect(farmRepository.getAllNested).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(farmsList);
  });

  it('should handle error in getAllNested method', async () => {
    // Arrange
    const errorMessage = { Error: 'Error retrieving farms' };
    jest.spyOn(farmRepository, 'getAllNested').mockRejectedValue(errorMessage);

    // Act
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    await farmController.getAll(mockResponse as Response);

    // Assert
    expect(farmRepository.getAllNested).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error retrieving Farms',
      details: errorMessage,
    });
  });
});
