import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionEnum } from 'src/common/constatns/permissions.enum';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async seedPermissions() {
    const permissions = Object.values(PermissionEnum).map((permission) => ({
      nom: permission,
      description: `Permission ${permission}`,
    }));

    for (const permission of permissions) {
      const existingPermission = await this.permissionRepository.findOne({
        where: { nom: permission.nom },
      });
      if (!existingPermission) {
        await this.permissionRepository.save(
          this.permissionRepository.create(permission),
        );
      }
    }
  }
}
