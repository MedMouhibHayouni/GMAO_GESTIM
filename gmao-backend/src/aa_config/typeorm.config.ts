import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: (process.env.DB_USERNAME || 'postgres') as string,
  password: (process.env.DB_PASSWORD || 'postgres') as string,
  database: process.env.DB_NAME || 'gmao_db',
  entities: [resolve(__dirname, '..', '**/*.entity{.ts,.js}')],
  synchronize: true,
  logging: process.env.DB_LOGGING === 'true',
};
