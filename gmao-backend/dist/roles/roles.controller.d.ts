import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<import("./dto/role-response.dto").RoleResponseDto>;
    findAll(): Promise<import("./dto/role-response.dto").RoleResponseDto[]>;
    findOne(id: string): Promise<import("./dto/role-response.dto").RoleResponseDto>;
}
