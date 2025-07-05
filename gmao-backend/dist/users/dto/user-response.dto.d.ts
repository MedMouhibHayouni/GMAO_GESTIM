import { RoleResponseDto } from 'src/roles/dto/role-response.dto';
export declare class UserResponseDto {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: RoleResponseDto;
}
