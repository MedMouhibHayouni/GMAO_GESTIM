import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { SidebarService } from '../../../core/services/sidebar.service';
import { SidebarItem } from '../../../core/models/sidebar-item.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  sidebarItems: SidebarItem[] = [];
  isCollapsed = false;
  private animationTimeline!: gsap.core.Timeline; // Definite assignment assertion

  constructor(private sidebarService: SidebarService) {}

  ngOnInit(): void {
    this.sidebarItems = this.sidebarService.getSidebarItems();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  initializeAnimations(): void {
    this.animationTimeline = gsap.timeline({ paused: true });
    gsap.set('.sidebar-item', { opacity: 1, x: 0 });
    gsap.set('.sidebar-item-text, .sidebar-item-chevron, .badge', { opacity: 1 });
    gsap.set('[id^="submenu-"]', { height: 0, opacity: 0, display: 'none' });
  }

  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
    this.animateSidebarToggle();
  }

  toggleItem(item: SidebarItem): void {
    if (item.children) {
      if (!item.isExpanded) {
        this.sidebarItems.forEach(i => {
          if (i !== item && i.isExpanded) {
            this.collapseSubmenuByItem(i); // Use the item-based collapse method
            i.isExpanded = false;
          }
        });
      }
      item.isExpanded = !item.isExpanded;
      this.animateSubmenu(item);
    }
  }

  private animateSidebarToggle(): void {
    this.animationTimeline.clear();

    if (this.isCollapsed) {
      this.animationTimeline
        .to('.sidebar-container', {
          duration: 0.4,
          width: 96,
          ease: 'power3.inOut'
        })
        .to('.sidebar-item-text, .sidebar-item-chevron, .badge', {
          duration: 0.3,
          opacity: 0,
          x: -10,
          ease: 'power2.in',
          stagger: 0.05
        }, 0)
        .to('.sidebar-item i.fas', {
          duration: 0.3,
          x: 8,
          ease: 'power2.inOut'
        }, 0);

      this.sidebarItems.forEach(item => {
        if (item.isExpanded) {
          this.collapseSubmenuByItem(item); // Use the item-based collapse method
          item.isExpanded = false;
        }
      });
    } else {
      this.animationTimeline
        .to('.sidebar-container', {
          duration: 0.5,
          width: 288,
          ease: 'power3.out'
        })
        .to('.sidebar-item-text, .sidebar-item-chevron, .badge', {
          duration: 0.4,
          opacity: 1,
          x: 0,
          ease: 'power3.out',
          stagger: 0.07
        }, 0.1)
        .to('.sidebar-item i.fas', {
          duration: 0.4,
          x: 0,
          ease: 'back.out(2)'
        }, 0.1);
    }

    this.animationTimeline.play();
  }

  private animateSubmenu(item: SidebarItem): void {
    const submenuId = this.getSubmenuId(item.name);
    const submenu = document.getElementById(submenuId);

    if (!submenu) return;

    if (item.isExpanded) {
      this.expandSubmenu(submenu);
    } else {
      this.collapseSubmenu(submenu);
    }
  }

  private expandSubmenu(element: HTMLElement): void {
    gsap.killTweensOf(element);

    gsap.set(element, { display: 'block', height: 'auto', opacity: 0 });
    const height = element.offsetHeight;
    gsap.set(element, { height: 0 });

    gsap.to(element, {
      duration: 0.5,
      height: height,
      opacity: 1,
      ease: 'power3.out',
      onComplete: () => {
        gsap.set(element, { height: 'auto' });
      }
    });
  }

  private collapseSubmenu(element: HTMLElement): void {
    gsap.killTweensOf(element);

    const height = element.offsetHeight;
    gsap.set(element, { height: height });

    gsap.to(element, {
      duration: 0.3,
      height: 0,
      opacity: 0,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(element, { display: 'none' });
      }
    });
  }

  // New method to collapse submenu by SidebarItem
  private collapseSubmenuByItem(item: SidebarItem): void {
    const submenuId = this.getSubmenuId(item.name);
    const submenu = document.getElementById(submenuId);

    if (submenu) {
      this.collapseSubmenu(submenu);
    }
  }

  getSubmenuId(name: string): string {
    return 'submenu-' + name.replace(/\s+/g, '-').toLowerCase();
  }

  badgeColorClasses(color: string): string {
    const colorMap: Record<string, string> = {
      'red': 'bg-red-500',
      'blue': 'bg-blue-500',
      'green': 'bg-green-500',
      'yellow': 'bg-yellow-500',
      'indigo': 'bg-indigo-500',
      'purple': 'bg-purple-500',
      'pink': 'bg-pink-500'
    };
    return colorMap[color] || 'bg-indigo-500';
  }
}
