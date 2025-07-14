import { PermissionEnum } from '../constatns/permissions.enum';
export declare const PERMISSIONS_KEY = "permissions";
export declare const Permissions: (...permissions: PermissionEnum[]) => import("@nestjs/common").CustomDecorator<string>;
