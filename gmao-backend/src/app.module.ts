import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './aa_config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { PermissionRoleSeeder } from './database/seeders/permission-role.seeder';
import { Permission } from './permission/entities/permission.entity';
import { Role } from './role/entities/role.entity';

const throttlerConfig = {
  ttl: parseInt(process.env.THROTTLE_TTL, 10),
  limit: parseInt(process.env.THROTTLE_LIMIT, 10),
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([Permission, Role]), // Add this line
    ThrottlerModule.forRoot([throttlerConfig]),

    AuthModule,
    UtilisateurModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [AppService, PermissionRoleSeeder],
})
export class AppModule {}
