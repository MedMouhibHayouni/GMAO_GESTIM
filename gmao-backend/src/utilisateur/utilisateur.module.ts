import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilisateurService } from './utilisateur.service';
import { UtilisateurController } from './utilisateur.controller';
import { RoleModule } from '../role/role.module';
import { Utilisateur } from './entities/utilisateur.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Utilisateur]),
    RoleModule,
    forwardRef(() => AuthModule), // Utilisez forwardRef ici
  ],
  providers: [UtilisateurService],
  controllers: [UtilisateurController],
  exports: [UtilisateurService],
})
export class UtilisateurModule {}
