import { Component, OnInit, AfterViewInit, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { gsap } from 'gsap';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarService } from '../../../core/services/sidebar.service';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  user: any;
  isSidebarOpen = true;
  isDarkMode = false;
  private isBrowser: boolean;

  constructor(
    private authService: AuthService,
    private sidebarService: SidebarService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    this.sidebarService.isOpen$.subscribe(open => {
      this.isSidebarOpen = open;
      this.animateNavbarToggle();
    });

    if (this.isBrowser) {
      this.initializeDarkMode();
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initializeDropdowns();
      this.animateNavbarEntrance();
    }
  }

  private initializeDarkMode(): void {
    const savedMode = localStorage.getItem('darkMode');
    this.isDarkMode = savedMode === 'true' ||
                     (!savedMode && window.matchMedia('(prefers-color-scheme: dark)').matches);

    this.updateDarkModeState();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString());
    this.updateDarkModeState();
  }

  private updateDarkModeState(): void {
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark');
    }
  }

  private initializeDropdowns(): void {
    const dropdownButtons = document.querySelectorAll('.dropdown > button');
    dropdownButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const menu = button.nextElementSibling as HTMLElement;
        if (menu) {
          const isHidden = menu.classList.contains('hidden');
          document.querySelectorAll('.dropdown-menu').forEach(m => {
            if (m !== menu) m.classList.add('hidden');
          });
          menu.classList.toggle('hidden', !isHidden);
        }
      });
    });

    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown-menu').forEach(menu => {
          menu.classList.add('hidden');
        });
      }
    });
  }

  private animateNavbarEntrance(): void {
    gsap.from('.navbar-item', {
      duration: 0.8,
      y: -20,
      opacity: 0,
      stagger: 0.1,
      ease: 'elastic.out(1, 0.5)',
      delay: 0.2
    });
  }

  private animateNavbarToggle(): void {
    gsap.from('.navbar', {
      duration: 0.4,
      x: this.isSidebarOpen ? -10 : 10,
      opacity: 0.8,
      ease: 'power2.out'
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout(): void {
    this.authService.logout();
  }
}
