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
exports.UtilisateurService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const role_service_1 = require("../role/role.service");
const utilisateur_entity_1 = require("./entities/utilisateur.entity");
let UtilisateurService = class UtilisateurService {
    constructor(utilisateurRepository, roleService) {
        this.utilisateurRepository = utilisateurRepository;
        this.roleService = roleService;
    }
    async create(createUtilisateurDto) {
        const { motDePasse, ...rest } = createUtilisateurDto;
        const hashedPassword = await bcrypt.hash(motDePasse, 10);
        const role = await this.roleService.findByName(createUtilisateurDto.role);
        if (!role) {
            throw new common_1.NotFoundException('Rôle non trouvé');
        }
        const utilisateur = this.utilisateurRepository.create({
            ...rest,
            motDePasse: hashedPassword,
            role,
        });
        return this.utilisateurRepository.save(utilisateur);
    }
    async findAll() {
        return this.utilisateurRepository.find({ relations: ['role'] });
    }
    async findOne(id) {
        const utilisateur = await this.utilisateurRepository.findOne({
            where: { id },
            relations: ['role'],
        });
        if (!utilisateur) {
            throw new common_1.NotFoundException('Utilisateur non trouvé');
        }
        return utilisateur;
    }
    async findByEmail(email) {
        return this.utilisateurRepository.findOne({
            where: { email },
            relations: ['role'],
            select: ['id', 'nom', 'email', 'motDePasse', 'role'],
        });
    }
};
exports.UtilisateurService = UtilisateurService;
exports.UtilisateurService = UtilisateurService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(utilisateur_entity_1.Utilisateur)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        role_service_1.RoleService])
], UtilisateurService);
//# sourceMappingURL=utilisateur.service.js.map