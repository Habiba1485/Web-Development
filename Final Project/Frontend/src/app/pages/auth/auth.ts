import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './auth.html',
  styleUrl: './auth.css'
})
export class AuthPage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  mode = signal<'signin' | 'register'>('signin');
  email = '';
  password = '';
  name = '';
  phone = '';
  role: 'guest' | 'host' = 'guest';

  isSubmitting = signal(false);
  errorMessage = signal('');

  constructor() {
    // Check path for signin / signup route
    const currentPath = this.router.url;
    if (currentPath.includes('signup') || currentPath.includes('register')) {
      this.mode.set('register');
    }
  }

  toggleMode(newMode: 'signin' | 'register'): void {
    this.mode.set(newMode);
    this.errorMessage.set('');
  }

  submit(): void {
    this.errorMessage.set('');

    if (this.mode() === 'signin') {
      if (!this.email || !this.password) {
        this.errorMessage.set('Please enter both email and password.');
        return;
      }

      this.isSubmitting.set(true);
      this.authService.signin({ email: this.email, password: this.password }).subscribe({
        next: () => {
          this.isSubmitting.set(false);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(err.error?.message || 'Invalid email or password.');
        }
      });
    } else {
      if (!this.name || !this.email || !this.password) {
        this.errorMessage.set('Please fill in all required fields.');
        return;
      }

      this.isSubmitting.set(true);
      const payload = {
        name: this.name,
        email: this.email,
        password: this.password,
        role: this.role,
        phone: this.phone
      };

      this.authService.signup(payload).subscribe({
        next: () => {
          this.isSubmitting.set(false);
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(err.error?.message || 'Failed to create account.');
        }
      });
    }
  }
}
