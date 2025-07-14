import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UtilisateurService } from '../utilisateur/utilisateur.service';
export declare class AuthService {
    private utilisateurService;
    private jwtService;
    constructor(utilisateurService: UtilisateurService, jwtService: JwtService);
    validateUser(email: string, pass: string): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: any;
            nom: any;
            email: any;
            role: {
                id: any;
                nom: any;
                description: any;
                permissions: any;
            };
        };
    }>;
    register(registerDto: RegisterDto): Promise<{
        id: number;
        nom: string;
        email: string;
        role: import("../role/entities/role.entity").Role;
    }>;
}
