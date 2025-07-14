import { RoleEnum } from 'src/common/constatns/roles.enum';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
export declare class RoleService {
    private roleRepository;
    constructor(roleRepository: Repository<Role>);
    findByName(nom: RoleEnum): Promise<Role | undefined>;
    seedRoles(): Promise<void>;
}
