import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto, lang?: string): Promise<{
        id: number;
        nom: string;
        email: string;
        role: import("../role/entities/role.entity").Role;
    }>;
    login(loginDto: LoginDto, lang?: string): Promise<{
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
}
