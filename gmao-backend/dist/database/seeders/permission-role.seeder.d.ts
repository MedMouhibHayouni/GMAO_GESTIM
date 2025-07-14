import { DataSource } from 'typeorm';
export declare class PermissionRoleSeeder {
    private readonly dataSource;
    private readonly logger;
    constructor(dataSource: DataSource);
    seed(): Promise<void>;
    private createPermissions;
    private createRoles;
}
