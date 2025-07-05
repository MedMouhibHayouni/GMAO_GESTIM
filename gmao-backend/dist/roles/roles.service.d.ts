import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    create(createRoleDto: CreateRoleDto): Promise<RoleResponseDto>;
    findAll(): Promise<RoleResponseDto[]>;
    findOne(id: string): Promise<RoleResponseDto>;
    findByName(name: string): Promise<Role>;
    private toResponseDto;
}
