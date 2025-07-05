import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { gsap } from 'gsap';
import { AnimationService } from '../../../core/services/animation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private animationService: AnimationService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngAfterViewInit(): void {
  this.animationService.animateFrom('.max-w-md', {
    duration: 0.8,
    y: -50,
    opacity: 0,
    ease: 'power3.out'
  });
}

  animateForm(): void {
    const formElement = document.querySelector('.max-w-md');
    if (formElement) {
      gsap.from(formElement, {
        duration: 0.8,
        y: -50,
        opacity: 0,
        ease: 'power3.out'
      });
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = null;

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'Invalid username or password';
        this.shakeForm();
      }
    });
  }

  shakeForm(): void {
    const formElement = document.querySelector('.max-w-md');
    if (formElement) {
      gsap.to(formElement, {
        duration: 0.6,
        keyframes: [
          { x: -10 },
          { x: 10 },
          { x: -10 },
          { x: 10 },
          { x: 0 }
        ],
        ease: 'power1.out'
      });
    }
  }
}
