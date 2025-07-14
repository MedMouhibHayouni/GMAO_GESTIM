import { Permission } from 'src/permission/entities/permission.entity';
import { Utilisateur } from 'src/utilisateur/entities/utilisateur.entity';
export declare class Role {
    id: number;
    nom: string;
    description: string;
    utilisateurs: Utilisateur[];
    permissions: Permission[];
}
