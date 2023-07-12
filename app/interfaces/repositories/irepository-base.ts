export interface IRepositoryBase<T> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
}
