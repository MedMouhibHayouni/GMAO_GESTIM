import { Injectable, OnModuleInit } from '@nestjs/common';
import { PermissionEnum } from 'src/common/constatns/permissions.enum';
import { RoleEnum } from 'src/common/constatns/roles.enum';
import { PermissionService } from 'src/permission/permission.service';
import { RoleService } from 'src/role/role.service';
import { CreateUtilisateurDto } from 'src/utilisateur/dto/create-utilisateur.dto';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';

@Injectable()
export class InitialSeeder implements OnModuleInit {
  constructor(
    private permissionService: PermissionService,
    private roleService: RoleService,
    private utilisateurService: UtilisateurService,
  ) {}

  async onModuleInit() {
    await this.seedPermissions();
    await this.seedRoles();
    await this.seedAdminUser();
  }

  private async seedPermissions() {
    await this.permissionService.seedPermissions();
  }

  private async seedRoles() {
    await this.roleService.seedRoles();

    // Assigner les permissions aux rôles
    const adminRole = await this.roleService.findByName(RoleEnum.ADMIN);
    if (adminRole) {
      // Assigner toutes les permissions au rôle admin
      adminRole.permissions = Object.values(PermissionEnum).map(
        (p) => ({ nom: p }) as any,
      );
      await this.roleService['roleRepository'].save(adminRole);
    }
  }

  private async seedAdminUser() {
    const adminExists =
      await this.utilisateurService.findByEmail('admin@gmao.com');
    if (!adminExists) {
      const adminDto: CreateUtilisateurDto = {
        nom: 'Admin',
        email: 'admin@gmao.com',
        motDePasse: 'Admin123!',
        role: RoleEnum.ADMIN,
      };
      await this.utilisateurService.create(adminDto);
    }
  }
}
