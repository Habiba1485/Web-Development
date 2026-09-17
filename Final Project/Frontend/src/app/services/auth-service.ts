import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/v1/auth';
  private httpClient = inject(HttpClient);
  private router = inject(Router);

  isLoggedInSignal = signal<boolean>(false);

  constructor() {
    this.isLoggedInSignal.set(this.checkInitialAuth());
  }

  private checkInitialAuth(): boolean {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    if (!token) return false;
    const decoded = this.getDecodedToken();
    if (!decoded || !decoded.exp) return false;
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem('token');
      return false;
    }
    return true;
  }

  getDecodedToken(): any {
    if (typeof window === 'undefined') return null;
    const token = localStorage.getItem('token');
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const decodedJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedJson);
    } catch {
      return null;
    }
  }

  getRole(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.role : null;
  }

  getUserId(): string | null {
    const decoded = this.getDecodedToken();
    return decoded ? decoded.id : null;
  }

  isLoggedIn(): boolean {
    const isAuth = this.checkInitialAuth();
    this.isLoggedInSignal.set(isAuth);
    return isAuth;
  }

  signin(credentials: { email: string; password: string }) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/signin`, credentials)
      .pipe(
        tap((res) => {
          if (res && res.token) {
            localStorage.setItem('token', res.token);
            this.isLoggedInSignal.set(true);
            const role = this.getRole();
            if (role === 'host') {
              this.router.navigate(['/host']);
            } else {
              this.router.navigate(['/home']);
            }
          }
        })
      );
  }

  signup(userData: FormData | any) {
    return this.httpClient
      .post<any>(`${this.baseUrl}/signup`, userData)
      .pipe(
        tap((res) => {
          const token = res.token || (res.data && res.data.token);
          if (token) {
            localStorage.setItem('token', token);
            this.isLoggedInSignal.set(true);
            const role = this.getRole();
            if (role === 'host') {
              this.router.navigate(['/host']);
            } else {
              this.router.navigate(['/home']);
            }
          }
        })
      );
  }

  logout() {
    this.isLoggedInSignal.set(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
    this.router.navigate(['/home']);
  }
}
