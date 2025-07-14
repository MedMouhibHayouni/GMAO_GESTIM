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
var PermissionRoleSeeder_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionRoleSeeder = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const permission_entity_1 = require("../../permission/entities/permission.entity");
const role_entity_1 = require("../../role/entities/role.entity");
const permissions_enum_1 = require("../../common/constatns/permissions.enum");
const roles_enum_1 = require("../../common/constatns/roles.enum");
let PermissionRoleSeeder = PermissionRoleSeeder_1 = class PermissionRoleSeeder {
    constructor(dataSource) {
        this.dataSource = dataSource;
        this.logger = new common_1.Logger(PermissionRoleSeeder_1.name);
    }
    async seed() {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();
            const roleCount = await queryRunner.manager.count(role_entity_1.Role);
            if (roleCount > 0) {
                this.logger.log('Database already seeded - skipping');
                return;
            }
            this.logger.log('Starting database seeding...');
            const permissions = await this.createPermissions(queryRunner);
            await this.createRoles(queryRunner, permissions);
            await queryRunner.commitTransaction();
            this.logger.log('✅ Database seeding completed successfully');
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            this.logger.error('❌ Database seeding failed', error.stack);
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
    async createPermissions(queryRunner) {
        const permissions = Object.values(permissions_enum_1.PermissionEnum).map((permission) => {
            const p = new permission_entity_1.Permission();
            p.nom = permission;
            p.description = permissions_enum_1.PermissionEnumLabels[permission]?.fr || permission;
            return p;
        });
        await queryRunner.manager.save(permission_entity_1.Permission, permissions);
        this.logger.log(`Created ${permissions.length} permissions`);
        return permissions;
    }
    async createRoles(queryRunner, permissions) {
        const roles = [
            {
                nom: roles_enum_1.RoleEnum.SUPER_ADMIN,
                description: roles_enum_1.RoleEnumLabels[roles_enum_1.RoleEnum.SUPER_ADMIN].fr,
                permissions: [...permissions],
            },
            {
                nom: roles_enum_1.RoleEnum.ADMIN,
                description: roles_enum_1.RoleEnumLabels[roles_enum_1.RoleEnum.ADMIN].fr,
                permissions: permissions.filter((p) => !p.nom.includes('role:') && !p.nom.includes('user:delete')),
            },
            {
                nom: roles_enum_1.RoleEnum.TECHNICIEN,
                description: roles_enum_1.RoleEnumLabels[roles_enum_1.RoleEnum.TECHNICIEN].fr,
                permissions: permissions.filter((p) => p.nom.includes('intervention:') ||
                    p.nom.includes('bon_travail:') ||
                    p.nom.includes('message:')),
            },
        ];
        for (const roleData of roles) {
            const role = new role_entity_1.Role();
            role.nom = roleData.nom;
            role.description = roleData.description;
            role.permissions = roleData.permissions;
            await queryRunner.manager.save(role_entity_1.Role, role);
            this.logger.log(`Created role: ${roleData.nom}`);
        }
    }
};
exports.PermissionRoleSeeder = PermissionRoleSeeder;
exports.PermissionRoleSeeder = PermissionRoleSeeder = PermissionRoleSeeder_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], PermissionRoleSeeder);
//# sourceMappingURL=permission-role.seeder.js.map