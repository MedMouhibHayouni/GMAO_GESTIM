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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const utilisateur_service_1 = require("../utilisateur/utilisateur.service");
let AuthService = class AuthService {
    constructor(utilisateurService, jwtService) {
        this.utilisateurService = utilisateurService;
        this.jwtService = jwtService;
    }
    async validateUser(email, pass) {
        console.log(`Tentative de connexion pour: ${email}`);
        const user = await this.utilisateurService.findByEmail(email);
        if (!user) {
            console.log('Utilisateur non trouvé');
            return null;
        }
        console.log(`Utilisateur trouvé: ${user.email}`);
        console.log(`Mot de passe hashé en DB: ${user.motDePasse}`);
        if (!user.motDePasse) {
            console.log('Aucun mot de passe défini pour cet utilisateur');
            return null;
        }
        try {
            const isMatch = await bcrypt.compare(pass, user.motDePasse);
            console.log(`Comparaison mot de passe: ${isMatch}`);
            if (!isMatch) {
                return null;
            }
            const { motDePasse, ...result } = user;
            return result;
        }
        catch (error) {
            console.error('Erreur lors de la comparaison:', error);
            return null;
        }
    }
    async login(loginDto) {
        const user = await this.validateUser(loginDto.email, loginDto.motDePasse);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const permissionNames = user.role?.permissions?.map((p) => p.nom) || [];
        const payload = {
            email: user.email,
            sub: user.id,
            role: user.role?.nom,
            permissions: permissionNames,
        };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                nom: user.nom,
                email: user.email,
                role: {
                    id: user.role?.id,
                    nom: user.role?.nom,
                    description: user.role?.description,
                    permissions: user.role?.permissions?.map((p) => ({
                        id: p.id,
                        nom: p.nom,
                        description: p.description,
                    })),
                },
            },
        };
    }
    async register(registerDto) {
        const lang = registerDto['lang'] || 'fr';
        const existingUser = await this.utilisateurService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new common_1.UnauthorizedException(lang === 'ar'
                ? 'يوجد مستخدم مسجل بهذا البريد الإلكتروني'
                : 'Un utilisateur avec cet email existe déjà');
        }
        const newUser = await this.utilisateurService.create(registerDto);
        const { motDePasse, ...result } = newUser;
        return result;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [utilisateur_service_1.UtilisateurService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map