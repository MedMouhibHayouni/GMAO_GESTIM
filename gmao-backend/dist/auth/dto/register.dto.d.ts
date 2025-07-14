import { ValidationArguments, ValidatorConstraintInterface } from 'class-validator';
import { RoleEnum } from 'src/common/constatns/roles.enum';
import { ValidationMessages } from 'src/common/validation-messages';
export declare class LanguageMessageValidator implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): any;
}
export declare function ValidateMessage(messageKey: keyof typeof ValidationMessages): PropertyDecorator;
export declare class RegisterDto {
    nom: string;
    email: string;
    motDePasse: string;
    role: RoleEnum;
}
