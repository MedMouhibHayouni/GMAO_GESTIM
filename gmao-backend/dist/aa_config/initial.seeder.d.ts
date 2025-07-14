import { OnModuleInit } from '@nestjs/common';
import { PermissionService } from 'src/permission/permission.service';
import { RoleService } from 'src/role/role.service';
import { UtilisateurService } from 'src/utilisateur/utilisateur.service';
export declare class InitialSeeder implements OnModuleInit {
    private permissionService;
    private roleService;
    private utilisateurService;
    constructor(permissionService: PermissionService, roleService: RoleService, utilisateurService: UtilisateurService);
    onModuleInit(): Promise<void>;
    private seedPermissions;
    private seedRoles;
    private seedAdminUser;
}
