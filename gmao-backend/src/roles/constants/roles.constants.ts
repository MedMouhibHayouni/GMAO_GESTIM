import { RoleEnum } from '../enums/roles.enum';

export const STANDARD_ROLES = [
  { name: RoleEnum.ADMIN, description: 'Full system access' },
  {
    name: RoleEnum.MAINTENANCE_MANAGER,
    description: 'Manages maintenance operations',
  },
  { name: RoleEnum.TECHNICIAN, description: 'Performs maintenance tasks' },
  {
    name: RoleEnum.PROCUREMENT_OFFICER,
    description: 'Handles purchases and inventory',
  },
  { name: RoleEnum.READ_ONLY, description: 'View-only access' },
];
