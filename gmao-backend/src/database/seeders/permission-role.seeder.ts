// src/database/seeders/permission-role.seeder.ts
import { Injectable, Logger } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Permission } from '../../permission/entities/permission.entity';
import { Role } from '../../role/entities/role.entity';
import {
  PermissionEnum,
  PermissionEnumLabels,
} from 'src/common/constatns/permissions.enum';
import { RoleEnum, RoleEnumLabels } from 'src/common/constatns/roles.enum';

@Injectable()
export class PermissionRoleSeeder {
  private readonly logger = new Logger(PermissionRoleSeeder.name);

  constructor(private readonly dataSource: DataSource) {}

  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      // Check if seeding is needed
      const roleCount = await queryRunner.manager.count(Role);
      if (roleCount > 0) {
        this.logger.log('Database already seeded - skipping');
        return;
      }

      this.logger.log('Starting database seeding...');

      // Create permissions
      const permissions = await this.createPermissions(queryRunner);
      await this.createRoles(queryRunner, permissions);

      await queryRunner.commitTransaction();
      this.logger.log('✅ Database seeding completed successfully');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error('❌ Database seeding failed', error.stack);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async createPermissions(queryRunner) {
    const permissions = Object.values(PermissionEnum).map((permission) => {
      const p = new Permission();
      p.nom = permission;
      p.description = PermissionEnumLabels[permission]?.fr || permission;
      return p;
    });

    await queryRunner.manager.save(Permission, permissions);
    this.logger.log(`Created ${permissions.length} permissions`);
    return permissions;
  }

  private async createRoles(queryRunner, permissions: Permission[]) {
    const roles = [
      {
        nom: RoleEnum.SUPER_ADMIN,
        description: RoleEnumLabels[RoleEnum.SUPER_ADMIN].fr,
        permissions: [...permissions],
      },
      {
        nom: RoleEnum.ADMIN,
        description: RoleEnumLabels[RoleEnum.ADMIN].fr,
        permissions: permissions.filter(
          (p) => !p.nom.includes('role:') && !p.nom.includes('user:delete'),
        ),
      },
      {
        nom: RoleEnum.TECHNICIEN,
        description: RoleEnumLabels[RoleEnum.TECHNICIEN].fr,
        permissions: permissions.filter(
          (p) =>
            p.nom.includes('intervention:') ||
            p.nom.includes('bon_travail:') ||
            p.nom.includes('message:'),
        ),
      },
    ];

    for (const roleData of roles) {
      const role = new Role();
      role.nom = roleData.nom;
      role.description = roleData.description;
      role.permissions = roleData.permissions;
      await queryRunner.manager.save(Role, role);
      this.logger.log(`Created role: ${roleData.nom}`);
    }
  }
}
