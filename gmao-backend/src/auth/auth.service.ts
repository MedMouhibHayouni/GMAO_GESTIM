import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
import { RoleEnum } from 'src/common/constatns/roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private utilisateurService: UtilisateurService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    // Ajout de logs pour le débogage
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
    } catch (error) {
      console.error('Erreur lors de la comparaison:', error);
      return null;
    }
  }

  // src/auth/auth.service.ts
  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.motDePasse);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get permission names only
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
          // Include permissions here if needed
          permissions: user.role?.permissions?.map((p) => ({
            id: p.id,
            nom: p.nom,
            description: p.description,
          })),
        },
        // Remove the duplicate permissions array at root level
      },
    };
  }

  async register(registerDto: RegisterDto) {
    const lang = registerDto['lang'] || 'fr';
    const existingUser = await this.utilisateurService.findByEmail(
      registerDto.email,
    );

    if (existingUser) {
      throw new UnauthorizedException(
        lang === 'ar'
          ? 'يوجد مستخدم مسجل بهذا البريد الإلكتروني'
          : 'Un utilisateur avec cet email existe déjà',
      );
    }

    // Ne pas hacher ici, laisser le service utilisateur le faire
    const newUser = await this.utilisateurService.create(registerDto);

    const { motDePasse, ...result } = newUser;
    return result;
  }
}
