import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
export declare class PermissionService {
    private permissionRepository;
    constructor(permissionRepository: Repository<Permission>);
    seedPermissions(): Promise<void>;
}
