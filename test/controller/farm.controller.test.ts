import { Response } from 'express';
import 'reflect-metadata';
import { Model } from 'sequelize';
import { FarmController } from '../../app/controller/farm.controller';
import { ICrop } from '../../app/interfaces/model/icrop';
import { IFarm } from '../../app/interfaces/model/ifarm';
import { IFarmCrop } from '../../app/interfaces/model/ifarm-crop';
import { Crop } from '../../app/model/crop.model';
import { FarmCrop } from '../../app/model/farm-crop.model';
import { Farm } from '../../app/model/farm.model';
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

  it('should create a farm with cropsIds and return 201', async () => {
    // Arrange
    const body = {
      name: 'Farm 1',
      document: '123.456.789-00', // CPF válido
      propertyName: 'Property 1',
      city: 'City 1',
      state: 'State 1',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      active: true,
      cropsIds: ['1'],
    };

    const farm = {
      name: 'Farm 1',
      document: '123.456.789-00', // CPF válido
      propertyName: 'Property 1',
      city: 'City 1',
      state: 'State 1',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      active: true,
    };

    const farmCreated = {
      id: 'ce354e26-9970-48b5-9300-32340818f563',
      name: 'Farm 1',
      document: '123.456.789-00', // CPF válido
      propertyName: 'Property 1',
      city: 'City 1',
      state: 'State 1',
      totalArea: 100,
      arableArea: 50,
      vegetationArea: 50,
      active: true,
    };

    const mockFarm: Partial<Farm> = { ...body, id: '1' };
    const mockFarmRepositoryCreate = jest
      .spyOn(farmRepository, 'create')
      .mockResolvedValue(mockFarm as Farm);

    const mockCrop1: Partial<ICrop> = {
      id: '1',
      name: 'Crop 1',
    };
    const mockCropRepositoryFindByPk = jest
      .spyOn(Crop, 'findByPk')
      .mockResolvedValueOnce(mockCrop1 as Model<any, any>);

    const mockFarmCrop1: Partial<IFarmCrop> = {
      CropId: '1',
      FarmId: '1',
    };

    const mockFarmCropRepositoryCreate = jest
      .spyOn(farmCropRepository, 'create')
      .mockResolvedValueOnce(mockFarmCrop1 as FarmCrop);

    const mockFarmRepositoryGetByIdNested = jest
      .spyOn(farmRepository, 'getByIdNested')
      .mockResolvedValueOnce(farmCreated as Farm);

    // Act
    await farmController.postFarm(mockResponse as Response, body as IFarm);

    // Assert
    expect(mockFarmRepositoryCreate).toHaveBeenCalledWith(farm);
    expect(mockCropRepositoryFindByPk).toHaveBeenCalledWith('1');
    expect(mockFarmCropRepositoryCreate).toHaveBeenCalledWith(mockFarmCrop1);
    expect(mockFarmRepositoryGetByIdNested).toHaveBeenCalledWith('1');
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('should return 422 when validation fails', async () => {
    // Arrange
    const mockFarmData = {
      name: 'Farm 3',
      document: '123',
      propertyName: 'Property 3',
      city: 'City 3',
      state: 'State 3',
      totalArea: 50,
      arableArea: 25,
      vegetationArea: 30,
    };

    // Act
    await farmController.postFarm(
      mockResponse as Response,
      mockFarmData as IFarm
    );

    // Assert
    expect(mockResponse.status).toHaveBeenCalledWith(422);
    expect(mockResponse.json).toHaveBeenCalledWith({
      error:
        'Verifique os campos document (CPF ou CNPJ); totalArea é maior ou igual a soma de arableArea e vegetationArea; ',
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
