// src/auth/dto/register.dto.ts
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate,
} from 'class-validator';
import { RoleEnum } from 'src/common/constatns/roles.enum';
import { ValidationMessages } from 'src/common/validation-messages';

@ValidatorConstraint({ name: 'LanguageMessage', async: false })
export class LanguageMessageValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    return true; // Toujours valide, nous utilisons seulement pour le message
  }

  defaultMessage(args: ValidationArguments) {
    const { lang = 'fr' } = args.object as any;
    const messages = ValidationMessages[args.constraints[0]];
    return messages[lang] || messages.fr;
  }
}

export function ValidateMessage(messageKey: keyof typeof ValidationMessages) {
  return Validate(LanguageMessageValidator, [messageKey]);
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @ValidateMessage('REQUIRED')
  nom: string;

  @IsEmail()
  @ValidateMessage('INVALID_EMAIL')
  email: string;

  @MinLength(8)
  @ValidateMessage('PASSWORD_MIN_LENGTH')
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  @ValidateMessage('PASSWORD_COMPLEXITY')
  motDePasse: string;

  @IsNotEmpty()
  @ValidateMessage('ROLE_REQUIRED')
  role: RoleEnum;
}
