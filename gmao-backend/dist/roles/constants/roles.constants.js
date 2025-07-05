"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STANDARD_ROLES = void 0;
const roles_enum_1 = require("../enums/roles.enum");
exports.STANDARD_ROLES = [
    { name: roles_enum_1.RoleEnum.ADMIN, description: 'Full system access' },
    {
        name: roles_enum_1.RoleEnum.MAINTENANCE_MANAGER,
        description: 'Manages maintenance operations',
    },
    { name: roles_enum_1.RoleEnum.TECHNICIAN, description: 'Performs maintenance tasks' },
    {
        name: roles_enum_1.RoleEnum.PROCUREMENT_OFFICER,
        description: 'Handles purchases and inventory',
    },
    { name: roles_enum_1.RoleEnum.READ_ONLY, description: 'View-only access' },
];
//# sourceMappingURL=roles.constants.js.map