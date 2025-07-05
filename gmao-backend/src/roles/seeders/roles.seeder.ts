import { Injectable, OnModuleInit } from '@nestjs/common';
import { RolesService } from '../roles.service';
import { STANDARD_ROLES } from '../constants/roles.constants';

@Injectable()
export class RolesSeeder implements OnModuleInit {
  constructor(private readonly rolesService: RolesService) {}

  async onModuleInit() {
    await this.seedRoles();
  }

  private async seedRoles() {
    try {
      for (const roleData of STANDARD_ROLES) {
        const existingRole = await this.rolesService.findByName(roleData.name);
        if (!existingRole) {
          await this.rolesService.create(roleData);
          console.log(`Created role: ${roleData.name}`);
        }
      }
      console.log('✅ Standard roles initialization completed');
    } catch (error) {
      console.error('❌ Failed to seed roles:', error.message);
    }
  }
}
