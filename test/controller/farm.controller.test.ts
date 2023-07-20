import { Response } from 'express';
import 'reflect-metadata';
import { FarmController } from '../../app/controller/farm.controller';
import { IFarm } from '../../app/interfaces/model/ifarm';
import { Crop } from '../../app/model/crop.model';
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

  it('should handle error in getAll method', async () => {
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

  it('should call getByIdNested method and return farm', async () => {
    // Arrange
    jest.spyOn(farmRepository, 'getByIdNested').mockResolvedValue(farm);

    // Act
    await farmController.getById(mockResponse as Response, farm.id);

    // Assert
    expect(farmRepository.getByIdNested).toHaveBeenCalledTimes(1);
    expect(farmRepository.getByIdNested).toHaveBeenCalledWith(farm.id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(farm);
  });

  it('should handle error in getById method', async () => {
    // Arrange
    const id = 'ce354e26-9970-48b5-9300-32340818f563';
    const errorMessage = { Error: 'Error retrieving farm' };
    jest.spyOn(farmRepository, 'getByIdNested').mockRejectedValue(errorMessage);

    // Act
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    await farmController.getById(mockResponse as Response, id);

    // Assert
    expect(farmRepository.getByIdNested).toHaveBeenCalledTimes(1);
    expect(farmRepository.getByIdNested).toHaveBeenCalledWith(id);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error retrieving Farm',
      details: errorMessage,
    });
  });

  it('should call postFarm method and create farm', async () => {
    // Mock para Crop.findByPk
    jest.spyOn(Crop, 'findByPk').mockResolvedValue({
      id: 'df354e26-99970-48b5-9230-32383818f527',
      name: 'cacau',
    } as Crop);

    jest.spyOn(farmRepository, 'create').mockResolvedValue(farm);

    // Act
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    await farmController.postFarm(mockResponse as Response, farm as IFarm);

    // Assert
    expect(farmRepository.create).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('should handle error in postFarm method', async () => {
    // Arrange
    const createData = {
      name: 'string',
      document: '12312312323',
      propertyName: 'Fazenda Santa Fé',
      city: 'Presidente Prudente',
      state: 'São Paulo',
      totalArea: 1200,
      arableArea: 1000,
      vegetationArea: 200,
      active: true,
    };
    const errorMessage = { Error: 'Error on recording registries' };
    jest.spyOn(farmRepository, 'create').mockRejectedValue(errorMessage);

    // Act
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    await farmController.postFarm(
      mockResponse as Response,
      createData as IFarm
    );

    // Assert
    expect(farmRepository.create).toHaveBeenCalledTimes(1);
    expect(farmRepository.create).toHaveBeenCalledWith(createData);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error: 'Error on recording registries',
      details: errorMessage,
    });
  });

  it('should call update method and update farm', async () => {
    // Arrange
    const updateData = {
      id: 'ce354e26-9970-48b5-9300-32340818f563',
      name: 'Updated Farm Name',
      totalArea: 1500,
      document: '12312312323',
      propertyName: 'Fazenda Santa Fé',
      city: 'Presidente Prudente',
      state: 'São Paulo',
      arableArea: 1000,
      vegetationArea: 200,
      active: true,
      cropsIds: ['df354e26-99970-48b5-9230-32383818f527'],
    };
    jest.spyOn(farmRepository, 'update').mockResolvedValue(updateData);

    // Act
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    await farmController.update(mockResponse as Response, updateData);

    // Assert
    expect(farmRepository.update).toHaveBeenCalledTimes(1);
    expect(farmRepository.update).toHaveBeenCalledWith(farm.id, updateData);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updateData);
  });

  it('should return 404 when updating non-existing farm', async () => {
    // Arrange

    const farmId = 'ce354e26-9970-48b5-9300-32340818f563'; // ID de uma fazenda que não existe
    jest.spyOn(farmRepository, 'update').mockResolvedValue(null);
    const errorMessage = { error: 'Registry not found' };

    // Act
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await farmController.update(mockResponse as Response, {
      ...farm,
      id: farmId,
    });

    // Assert
    expect(farmRepository.update).toHaveBeenCalledTimes(1);
    expect(farmRepository.update).toHaveBeenCalledWith(farmId, {
      ...farm,
      id: farmId,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle error when updating farm', async () => {
    // Arrange

    const errorMessage = { error: 'Error on updating registries' };
    jest.spyOn(farmRepository, 'update').mockRejectedValue(errorMessage);

    // Act
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await farmController.update(mockResponse as Response, farm);

    // Assert
    expect(farmRepository.update).toHaveBeenCalledTimes(1);
    expect(farmRepository.update).toHaveBeenCalledWith(farm.id, farm);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should call delete method and delete farm', async () => {
    // Arrange

    jest
      .spyOn(farmRepository, 'delete')
      .mockImplementation(() => Promise.resolve());

    // Act
    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as Partial<Response>;
    await farmController.delete(mockResponse as Response, farm);

    // Assert
    expect(farmRepository.delete).toHaveBeenCalledTimes(1);
    expect(farmRepository.delete).toHaveBeenCalledWith(farm.id);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });

  it('should handle error when deleting farm', async () => {
    // Arrange

    const errorMessage = { error: 'Error deleting Registry' };
    jest.spyOn(farmRepository, 'delete').mockRejectedValue(errorMessage);

    // Act
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await farmController.delete(mockResponse as Response, farm);

    // Assert
    expect(farmRepository.delete).toHaveBeenCalledTimes(1);
    expect(farmRepository.delete).toHaveBeenCalledWith(farm.id);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });
});
