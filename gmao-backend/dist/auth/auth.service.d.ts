import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<UserResponseDto>;
    login(loginDto: LoginDto): Promise<{
        access_token: string;
        user: UserResponseDto;
    }>;
    register(registerDto: RegisterDto): Promise<UserResponseDto>;
}
