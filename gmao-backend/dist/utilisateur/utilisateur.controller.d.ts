import { UtilisateurService } from './utilisateur.service';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
export declare class UtilisateurController {
    private readonly utilisateurService;
    constructor(utilisateurService: UtilisateurService);
    create(createUtilisateurDto: CreateUtilisateurDto): Promise<import("./entities/utilisateur.entity").Utilisateur>;
    findAll(): Promise<import("./entities/utilisateur.entity").Utilisateur[]>;
    findOne(id: string): Promise<import("./entities/utilisateur.entity").Utilisateur>;
}
