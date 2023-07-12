import {Pool, QueryResult} from "pg";

import {IRepositoryBase} from "../interfaces/repositories/irepository-base";

export class RepositoryBase<T> implements IRepositoryBase<T> {
  protected readonly pool: Pool;
  protected readonly tableName: string;

  constructor(tableName: string) {
    this.pool = new Pool(); // Configure your PostgreSQL connection parameters here
    this.tableName = tableName;
  }

  protected async query(
    queryText: string,
    params?: any[]
  ): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      return await client.query(queryText, params);
    } finally {
      client.release();
    }
  }

  async getById(id: string): Promise<T> {
    const queryText = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await this.query(queryText, [id]);
    return result.rows[0] || null;
  }

  async getAll(): Promise<T[]> {
    const queryText = `SELECT * FROM ${this.tableName}`;
    const result = await this.query(queryText);
    return result.rows;
  }
}
