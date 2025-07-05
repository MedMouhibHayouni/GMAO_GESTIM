import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SidebarItem } from '../models/sidebar-item.model';
import { RoleEnum } from '../enums/role.enum';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarItems: SidebarItem[] = this.buildSidebarConfig();
  private isOpenSubject = new BehaviorSubject<boolean>(true);
  isOpen$ = this.isOpenSubject.asObservable();

  constructor(private authService: AuthService) {}

  toggleSidebar(): void {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  getSidebarItems(): SidebarItem[] {
    const currentUser = this.authService.getCurrentUser();
    const currentRole = currentUser?.role.name as RoleEnum;
    return this.filterItemsByRole(this.sidebarItems, currentRole);
  }

  private buildSidebarConfig(): SidebarItem[] {
    return [
      {
        name: 'Dashboard',
        icon: 'dashboard',
        route: '/dashboard',
        roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER, RoleEnum.TECHNICIAN, RoleEnum.PROCUREMENT_OFFICER, RoleEnum.READ_ONLY]
      },
      {
        name: 'Assets',
        icon: 'build',
        roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER, RoleEnum.TECHNICIAN],
        children: [
          {
            name: 'All Assets',
            icon: 'list',
            route: '/assets',
            roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER, RoleEnum.TECHNICIAN]
          },
          {
            name: 'Add Asset',
            icon: 'add',
            route: '/assets/new',
            roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER]
          },
          {
            name: 'Categories',
            icon: 'category',
            route: '/assets/categories',
            roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER]
          }
        ]
      },
      {
        name: 'Work Orders',
        icon: 'assignment',
        roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER, RoleEnum.TECHNICIAN],
        badge: {
          count: 5,
          color: 'warn'
        },
        children: [
          {
            name: 'All Orders',
            icon: 'list',
            route: '/work-orders',
            roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER]
          },
          {
            name: 'Create Order',
            icon: 'add',
            route: '/work-orders/new',
            roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER]
          },
          {
            name: 'My Tasks',
            icon: 'person',
            route: '/work-orders/assigned',
            roles: [RoleEnum.TECHNICIAN]
          }
        ]
      },
      {
        name: 'Inventory',
        icon: 'inventory',
        roles: [RoleEnum.ADMIN, RoleEnum.PROCUREMENT_OFFICER],
        children: [
          {
            name: 'Stock Items',
            icon: 'list',
            route: '/inventory',
            roles: [RoleEnum.ADMIN, RoleEnum.PROCUREMENT_OFFICER]
          },
          {
            name: 'Purchase Orders',
            icon: 'shopping_cart',
            route: '/inventory/purchases',
            roles: [RoleEnum.ADMIN, RoleEnum.PROCUREMENT_OFFICER]
          }
        ]
      },
      {
        name: 'Reports',
        icon: 'assessment',
        route: '/reports',
        roles: [RoleEnum.ADMIN, RoleEnum.MAINTENANCE_MANAGER]
      },
      {
        name: 'Administration',
        icon: 'admin_panel_settings',
        roles: [RoleEnum.ADMIN],
        children: [
          {
            name: 'Users',
            icon: 'people',
            route: '/admin/users'
          },
          {
            name: 'Roles',
            icon: 'security',
            route: '/admin/roles'
          },
          {
            name: 'Settings',
            icon: 'settings',
            route: '/admin/settings'
          }
        ]
      }
    ];
  }

  private filterItemsByRole(items: SidebarItem[], currentRole?: RoleEnum): SidebarItem[] {
    if (!currentRole) return [];

    return items
      .filter(item => !item.roles || item.roles.includes(currentRole))
      .map(item => ({
        ...item,
        children: item.children ? this.filterItemsByRole(item.children, currentRole) : undefined
      }))
      .filter(item => !item.children || item.children.length > 0);
  }
}
