"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitialSeeder = void 0;
const common_1 = require("@nestjs/common");
const permissions_enum_1 = require("../common/constatns/permissions.enum");
const roles_enum_1 = require("../common/constatns/roles.enum");
const permission_service_1 = require("../permission/permission.service");
const role_service_1 = require("../role/role.service");
const utilisateur_service_1 = require("../utilisateur/utilisateur.service");
let InitialSeeder = class InitialSeeder {
    constructor(permissionService, roleService, utilisateurService) {
        this.permissionService = permissionService;
        this.roleService = roleService;
        this.utilisateurService = utilisateurService;
    }
    async onModuleInit() {
        await this.seedPermissions();
        await this.seedRoles();
        await this.seedAdminUser();
    }
    async seedPermissions() {
        await this.permissionService.seedPermissions();
    }
    async seedRoles() {
        await this.roleService.seedRoles();
        const adminRole = await this.roleService.findByName(roles_enum_1.RoleEnum.ADMIN);
        if (adminRole) {
            adminRole.permissions = Object.values(permissions_enum_1.PermissionEnum).map((p) => ({ nom: p }));
            await this.roleService['roleRepository'].save(adminRole);
        }
    }
    async seedAdminUser() {
        const adminExists = await this.utilisateurService.findByEmail('admin@gmao.com');
        if (!adminExists) {
            const adminDto = {
                nom: 'Admin',
                email: 'admin@gmao.com',
                motDePasse: 'Admin123!',
                role: roles_enum_1.RoleEnum.ADMIN,
            };
            await this.utilisateurService.create(adminDto);
        }
    }
};
exports.InitialSeeder = InitialSeeder;
exports.InitialSeeder = InitialSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [permission_service_1.PermissionService,
        role_service_1.RoleService,
        utilisateur_service_1.UtilisateurService])
], InitialSeeder);
//# sourceMappingURL=initial.seeder.js.map