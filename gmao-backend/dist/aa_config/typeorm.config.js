"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeOrmConfig = void 0;
const path_1 = require("path");
exports.typeOrmConfig = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: (process.env.DB_USERNAME || 'postgres'),
    password: (process.env.DB_PASSWORD || 'postgres'),
    database: process.env.DB_NAME || 'gmao_db',
    entities: [(0, path_1.resolve)(__dirname, '..', '**/*.entity{.ts,.js}')],
    synchronize: true,
    logging: process.env.DB_LOGGING === 'true',
};
//# sourceMappingURL=typeorm.config.js.map