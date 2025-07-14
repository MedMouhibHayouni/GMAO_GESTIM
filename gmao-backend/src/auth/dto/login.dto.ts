// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ValidateMessage } from './register.dto';

export class LoginDto {
  @IsEmail()
  @ValidateMessage('INVALID_EMAIL')
  email: string;

  @IsNotEmpty()
  @ValidateMessage('REQUIRED')
  @IsString()
  motDePasse: string;
}
