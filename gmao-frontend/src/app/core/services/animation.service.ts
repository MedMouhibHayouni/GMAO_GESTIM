// core/services/animation.service.ts
import { Injectable } from '@angular/core';
import { gsap } from 'gsap';

@Injectable({ providedIn: 'root' })
export class AnimationService {
  isBrowser = typeof window !== 'undefined';

  animateFrom(selector: string, options: any) {
    if (this.isBrowser) {
      const element = document.querySelector(selector);
      if (element) {
        gsap.from(element, options);
      }
    }
  }

  animateTo(selector: string, options: any) {
    if (this.isBrowser) {
      const element = document.querySelector(selector);
      if (element) {
        gsap.to(element, options);
      }
    }
  }
}
