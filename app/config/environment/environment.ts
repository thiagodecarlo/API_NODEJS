import dotenv from "dotenv";
import {env} from "node:process";
dotenv.config();

const environments = {
  PORT: env.PORT || 3300,
  DB_HOST: env.DB_HOST || "localhost",
  DB_PORT: env.DB_PORT || 3000,
  DB_USER: env.DB_USER,
  DB_PASSWORD: env.DB_PASSWORD,
  DB_DATABASE: env.DB_DATABASE,
};

export {environments};
