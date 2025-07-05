import { RoleEnum } from 'src/roles/enums/roles.enum';
export declare class CreateUserDto {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    role: RoleEnum;
}
