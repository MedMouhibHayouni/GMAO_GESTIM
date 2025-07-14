import { Role } from 'src/role/entities/role.entity';
export declare class Utilisateur {
    id: number;
    nom: string;
    email: string;
    motDePasse: string;
    role: Role;
}
