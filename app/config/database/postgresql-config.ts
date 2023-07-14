import { Sequelize } from 'sequelize';
import { environment } from '../environment/environment';

const PostgreSequelizeConnector = new Sequelize({
  dialect: 'postgres',
  host: environment.DB_HOST,
  port: environment.DB_PORT,
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_DATABASE,
});

export { PostgreSequelizeConnector };
