import { PostgreSequelizeConnector } from './postgresql-config';

export async function startDatabase(): Promise<void> {
  try {
    await PostgreSequelizeConnector.sync();
    console.log('Tables successfully created!');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
}
