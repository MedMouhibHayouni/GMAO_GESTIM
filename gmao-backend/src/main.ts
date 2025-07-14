import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ensureDatabaseExists } from './aa_config/database-init.script';
import { ValidationPipe } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import helmet from 'helmet';
import { PermissionRoleSeeder } from './database/seeders/permission-role.seeder';

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
  await ensureDatabaseExists();

  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: ['http://localhost:4200'],
    credentials: true,
  });

  // Helmet for security headers
  app.use(helmet());

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Rate limiter
  ThrottlerModule.forRoot([
    {
      ttl: 60,
      limit: 10,
    },
  ]);

  // Apply global guards
  //const reflector = app.get(Reflector);
  //app.useGlobalGuards(new JwtAuthGuard(reflector), new RolesGuard(reflector));
  // Run the seeder
  // Run seeder in development
  if (process.env.NODE_ENV === 'development') {
    const seeder = app.get(PermissionRoleSeeder);
    await seeder.seed();
  }

  await app.listen(3000, () => {
    console.log('\n🚀 GMAO Backend is Running!');
    console.log(`🔗 Connected to PostgreSQL ${process.env.DB_PORT || 5432}`);
    console.log(`🌐 Listening at http://localhost:3000\n`);
  });
}
bootstrap();
