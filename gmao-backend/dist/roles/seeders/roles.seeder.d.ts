import { OnModuleInit } from '@nestjs/common';
import { RolesService } from '../roles.service';
export declare class RolesSeeder implements OnModuleInit {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    onModuleInit(): Promise<void>;
    private seedRoles;
}
