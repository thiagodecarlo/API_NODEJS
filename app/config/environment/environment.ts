import dotenv from 'dotenv';
import { env } from 'node:process';

dotenv.config();

const environment = {
  PORT: parseInt(env.DB_PORT || '3300', 10),
  DB_HOST: env.DB_HOST || 'localhost',
  DB_PORT: parseInt(env.DB_PORT || '5432', 10),
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_DATABASE: env.DB_DATABASE,
};

export { environment };
