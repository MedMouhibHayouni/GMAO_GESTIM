import { Component, OnInit, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  sidebarCollapsed = false;

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.sidebarService.isOpen$.subscribe(open => {
      this.sidebarCollapsed = !open;
    });
  }

  ngAfterViewInit(): void {
    this.animateDashboard();
  }

  animateDashboard(): void {
    // Animate the main content area only
    gsap.from('main', {
      duration: 0.8,
      y: 20,
      opacity: 0,
      ease: 'power3.out',
      delay: 0.2 // Small delay to let other elements settle
    });

    // Optional: If you want to animate the white background elements
    // Wait for content to load if needed
    setTimeout(() => {
      const contentElements = document.querySelectorAll('.bg-white, .bg-gray-50');
      if (contentElements.length > 0) {
        gsap.from(contentElements, {
          duration: 0.6,
          y: 10,
          opacity: 0,
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3
        });
      }
    }, 300);
  }
}
