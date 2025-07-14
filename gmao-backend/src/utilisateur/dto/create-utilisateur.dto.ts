import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { RoleEnum } from 'src/common/constatns/roles.enum';

export class CreateUtilisateurDto {
  @IsNotEmpty({ message: 'Le nom est requis' })
  @IsString()
  nom: string;

  @IsEmail({}, { message: 'Email invalide' })
  email: string;

  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  motDePasse: string;

  @IsNotEmpty()
  role: RoleEnum;
}
