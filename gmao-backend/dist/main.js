"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const database_init_script_1 = require("./aa_config/database-init.script");
const common_1 = require("@nestjs/common");
const throttler_1 = require("@nestjs/throttler");
const helmet_1 = require("helmet");
function validateEnv() {
    const required = [
        'DB_HOST',
        'DB_PORT',
        'DB_USERNAME',
        'DB_PASSWORD',
        'DB_NAME',
        'JWT_SECRET',
    ];
    for (const key of required) {
        if (!process.env[key]) {
            throw new Error(`Missing environment variable: ${key}`);
        }
    }
}
async function bootstrap() {
    console.log('Environment:', process.env.DB_PASSWORD);
    validateEnv();
    await (0, database_init_script_1.ensureDatabaseExists)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: ['http://localhost:4200'],
        credentials: true,
    });
    app.use((0, helmet_1.default)());
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    throttler_1.ThrottlerModule.forRoot([
        {
            ttl: 60,
            limit: 10,
        },
    ]);
    await app.listen(3000, () => {
        console.log(' ');
        console.log('🚀 GMAO Backend is Running!');
        console.log('🔗 Connected to PostgreSQL 17');
        console.log('🌐 Listening at http://localhost:3000');
        console.log(' ');
        console.log('✨ All systems operational ✨');
        console.log(' ');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map