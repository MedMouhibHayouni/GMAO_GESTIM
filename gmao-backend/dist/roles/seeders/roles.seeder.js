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
exports.RolesSeeder = void 0;
const common_1 = require("@nestjs/common");
const roles_service_1 = require("../roles.service");
const roles_constants_1 = require("../constants/roles.constants");
let RolesSeeder = class RolesSeeder {
    constructor(rolesService) {
        this.rolesService = rolesService;
    }
    async onModuleInit() {
        await this.seedRoles();
    }
    async seedRoles() {
        try {
            for (const roleData of roles_constants_1.STANDARD_ROLES) {
                const existingRole = await this.rolesService.findByName(roleData.name);
                if (!existingRole) {
                    await this.rolesService.create(roleData);
                    console.log(`Created role: ${roleData.name}`);
                }
            }
            console.log('✅ Standard roles initialization completed');
        }
        catch (error) {
            console.error('❌ Failed to seed roles:', error.message);
        }
    }
};
exports.RolesSeeder = RolesSeeder;
exports.RolesSeeder = RolesSeeder = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [roles_service_1.RolesService])
], RolesSeeder);
//# sourceMappingURL=roles.seeder.js.map