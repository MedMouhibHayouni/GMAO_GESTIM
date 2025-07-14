import { ValidationArguments } from 'class-validator';
export declare function getValidationMessage(messages: {
    [key: string]: string;
}, defaultMessage: string, args: ValidationArguments): string;
