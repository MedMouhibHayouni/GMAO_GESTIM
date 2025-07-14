// src/auth/auth.controller.ts
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiHeader } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Langue préférée (fr, ar)',
    required: false,
  })
  async register(
    @Body() registerDto: RegisterDto,
    @Headers('accept-language') lang: string = 'fr',
  ) {
    // Ajoute la langue à l'objet DTO pour les messages de validation
    (registerDto as any).lang = lang || 'fr';
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiHeader({
    name: 'Accept-Language',
    description: 'Langue préférée (fr, ar)',
    required: false,
  })
  async login(
    @Body() loginDto: LoginDto,
    @Headers('accept-language') lang: string = 'fr',
  ) {
    // Ajoute la langue à l'objet DTO pour les messages de validation
    (loginDto as any).lang = lang || 'fr';
    return this.authService.login(loginDto);
  }
}
