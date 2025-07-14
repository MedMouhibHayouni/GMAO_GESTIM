import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { RoleService } from '../role/role.service';
import { Utilisateur } from './entities/utilisateur.entity';
export declare class UtilisateurService {
    private utilisateurRepository;
    private roleService;
    constructor(utilisateurRepository: Repository<Utilisateur>, roleService: RoleService);
    create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur>;
    findAll(): Promise<Utilisateur[]>;
    findOne(id: number): Promise<Utilisateur>;
    findByEmail(email: string): Promise<Utilisateur | null>;
}
