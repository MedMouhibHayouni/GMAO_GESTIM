import { Role } from '../../roles/entities/role.entity';
export declare class User {
    id: string;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: Role;
    hashPassword(): Promise<void>;
}
