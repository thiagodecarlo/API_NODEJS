import { Model, ModelStatic } from 'sequelize';

export class RepositoryBase<
  T extends Model<TAttributes>,
  TAttributes extends object,
> {
  private model: ModelStatic<T>;

  constructor(model: ModelStatic<T>) {
    this.model = model;
  }

  public async getAll(): Promise<T[]> {
    try {
      const entities = await this.model.findAll();
      return entities;
    } catch (error) {
      throw new Error('Error getting entity from database:' + error);
    }
  }

  public async getById(id: string): Promise<T | null> {
    try {
      const entity = await this.model.findByPk(id);
      return entity;
    } catch (error) {
      throw new Error('Error getting entities from database:' + error);
    }
  }

  // TODO: Create generics methods for create, update and delete
}
