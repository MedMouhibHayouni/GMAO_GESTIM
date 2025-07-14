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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilisateurController = void 0;
const common_1 = require("@nestjs/common");
const utilisateur_service_1 = require("./utilisateur.service");
const create_utilisateur_dto_1 = require("./dto/create-utilisateur.dto");
const roles_enum_1 = require("../common/constatns/roles.enum");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const roles_decorator_1 = require("../common/decorators/roles.decorator");
let UtilisateurController = class UtilisateurController {
    constructor(utilisateurService) {
        this.utilisateurService = utilisateurService;
    }
    async create(createUtilisateurDto) {
        return this.utilisateurService.create(createUtilisateurDto);
    }
    async findAll() {
        return this.utilisateurService.findAll();
    }
    async findOne(id) {
        return this.utilisateurService.findOne(+id);
    }
};
exports.UtilisateurController = UtilisateurController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_utilisateur_dto_1.CreateUtilisateurDto]),
    __metadata("design:returntype", Promise)
], UtilisateurController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.ADMIN, roles_enum_1.RoleEnum.RESPONSABLE_MAINTENANCE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UtilisateurController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_enum_1.RoleEnum.ADMIN, roles_enum_1.RoleEnum.RESPONSABLE_MAINTENANCE),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UtilisateurController.prototype, "findOne", null);
exports.UtilisateurController = UtilisateurController = __decorate([
    (0, common_1.Controller)('utilisateurs'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService])
], UtilisateurController);
//# sourceMappingURL=utilisateur.controller.js.map