import { RoleEnum } from "../enums/role.enum";

export interface SidebarItem {
  name: string;
  icon: string;
  route?: string;
  roles?: RoleEnum[];
  children?: SidebarItem[];
  badge?: {
    count: number;
    color: string;
  };
  isExpanded?: boolean; // Add this line
}
