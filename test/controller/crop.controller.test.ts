import { Request, Response } from 'express';
import 'reflect-metadata';
import { CropController } from '../../app/controller/crop.controller';
import { ICrop } from '../../app/interfaces/model/icrop';
import { CropRepository } from '../../app/repositories/crop.repository';

describe('Crop Controller Tests', () => {
  let cropController: CropController;
  let cropRepository: CropRepository;
  let mockResponse: Response;

  const crop = {
    id: 'f0f23c3b-eae5-4d36-ab26-3615b204bad0',
    name: 'cacau',
    active: true,
  };

  const cropsList = [crop];

  beforeEach(() => {
    cropRepository = new CropRepository();
    cropController = new CropController(cropRepository);
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAll method and return crops', async () => {
    // Arrange
    jest.spyOn(cropRepository, 'getAllNested').mockResolvedValue(cropsList);

    // Act
    await cropController.getAll({} as Request, mockResponse as Response);

    // Assert
    expect(cropRepository.getAllNested).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(cropsList);
  });

  it('should handle error when retrieving crops', async () => {
    // Arrange
    const errorMessage = { error: 'Error retrieving Crops' };
    jest.spyOn(cropRepository, 'getAllNested').mockRejectedValue(errorMessage);

    // Act
    await cropController.getAll({} as Request, mockResponse as Response);

    // Assert
    expect(cropRepository.getAllNested).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should call getById method and return crop', async () => {
    // Arrange
    const id = 'ce354e26-9970-48b5-9300-32340818f563';
    jest.spyOn(cropRepository, 'getByIdNested').mockResolvedValue(crop);

    // Act
    await cropController.getById(mockResponse as Response, id);

    // Assert
    expect(cropRepository.getByIdNested).toHaveBeenCalledTimes(1);
    expect(cropRepository.getByIdNested).toHaveBeenCalledWith(id);
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(crop);
  });

  it('should handle error when retrieving crop', async () => {
    // Arrange
    const id = 'ce354e26-9970-48b5-9300-32340818f563';
    const errorMessage = { error: 'Error retrieving Crop' };
    jest.spyOn(cropRepository, 'getByIdNested').mockRejectedValue(errorMessage);

    // Act
    await cropController.getById(mockResponse as Response, id);

    // Assert
    expect(cropRepository.getByIdNested).toHaveBeenCalledTimes(1);
    expect(cropRepository.getByIdNested).toHaveBeenCalledWith(id);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should call create method and create a crop', async () => {
    // Arrange
    const createData = {
      id: '',
      name: 'Crop Name',
      active: false,
    };
    jest.spyOn(cropRepository, 'create').mockResolvedValue(crop);

    // Act
    await cropController.create(mockResponse as Response, createData);

    // Assert
    expect(cropRepository.create).toHaveBeenCalledTimes(1);
    expect(mockResponse.status).toHaveBeenCalledWith(201);
  });

  it('should handle error when creating crop', async () => {
    // Arrange
    const createData = {
      name: 'string',
    };
    const errorMessage = { error: 'Error on create Crop' };
    jest.spyOn(cropRepository, 'create').mockRejectedValue(errorMessage);

    // Act
    await cropController.create(mockResponse as Response, createData as ICrop);

    // Assert
    expect(cropRepository.create).toHaveBeenCalledTimes(1);
    expect(cropRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'string' })
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should call update method and update a crop', async () => {
    // Arrange
    const updateData = {
      id: 'f0f23c3b-eae5-4d36-ab26-3615b204bad0',
      name: 'Updated Crop Name',
      active: true,
    };
    jest.spyOn(cropRepository, 'update').mockResolvedValue(updateData);

    // Act
    await cropController.update(mockResponse as Response, updateData);

    // Assert
    expect(cropRepository.update).toHaveBeenCalledTimes(1);
    expect(cropRepository.update).toHaveBeenCalledWith(updateData.id, {
      name: updateData.name,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(updateData);
  });

  it('should return 404 when updating non-existing crop', async () => {
    // Arrange
    const cropId = 'ce354e26-9970-48b5-9300-32340818f563';
    const updateData = {
      id: cropId,
      name: 'Updated Crop Name',
      active: true,
    };
    const errorMessage = { error: 'Registry not found' };
    jest.spyOn(cropRepository, 'update').mockResolvedValue(null);

    // Act
    await cropController.update(mockResponse as Response, updateData);

    // Assert
    expect(cropRepository.update).toHaveBeenCalledTimes(1);
    expect(cropRepository.update).toHaveBeenCalledWith(updateData.id, {
      name: updateData.name,
    });
    expect(mockResponse.status).toHaveBeenCalledWith(404);

    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should handle error when updating crop', async () => {
    // Arrange
    const updateData = {
      id: 'ce354e26-9970-48b5-9300-32340818f563',
      name: 'string',
    };
    const errorMessage = { error: 'Error updating Registry' };
    jest.spyOn(cropRepository, 'update').mockRejectedValue(errorMessage);

    // Act
    await cropController.update(mockResponse as Response, updateData as ICrop);

    // Assert
    expect(cropRepository.update).toHaveBeenCalledTimes(1);
    expect(cropRepository.update).toHaveBeenCalledWith(
      'ce354e26-9970-48b5-9300-32340818f563',
      expect.objectContaining({ name: 'string' })
    );
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });

  it('should call delete method and delete a crop', async () => {
    // Arrange
    jest.spyOn(cropRepository, 'delete').mockResolvedValue();

    // Act
    await cropController.delete(mockResponse as Response, crop);

    // Assert
    expect(cropRepository.delete).toHaveBeenCalledTimes(1);
    expect(cropRepository.delete).toHaveBeenCalledWith(crop.id);
    expect(mockResponse.status).toHaveBeenCalledWith(204);
  });

  it('should call delete method and handle error', async () => {
    // Arrange
    const errorMessage = { error: 'Error deleting Registry' };
    jest.spyOn(cropRepository, 'delete').mockRejectedValue(errorMessage);

    // Act
    await cropController.delete(mockResponse as Response, crop);

    // Assert
    expect(cropRepository.delete).toHaveBeenCalledTimes(1);
    expect(cropRepository.delete).toHaveBeenCalledWith(crop.id);
    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith(errorMessage);
  });
});
